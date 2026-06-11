/**
 * POST /api/asset/from-url — локализация картинки в /static/psd/.
 * Принимает:
 *   - { url }           — внешний http(s) URL (скачиваем, с SSRF-защитой)
 *   - { base64 }        — base64 (с data:-префиксом или без; mime опц. через { mime })
 *   - { dataUrl }       — то же, что base64 с data:-префиксом
 *   - url может быть и data:image/...;base64,... — распознаём автоматически
 * Нужно для Mode 2/1/3/4 (фон от grsai/Supabase/новых моделей → локальный путь).
 * См. posteren-api-extension-spec §4.
 *
 * Примечание по лимиту тела: глобально стоит bodyParser.json({ limit: '100mb' })
 * в main.ts, поэтому base64 PNG 1024² (~2–4 МБ) проходит без доп. настройки.
 */
import { Request, Response } from 'express'
import fs from 'fs'
import dns from 'dns'
import net from 'net'
import { promisify } from 'util'
import axios from 'axios'
import sizeOf from 'image-size'
import { filePath } from '../configs'
import { checkCreateFolder, randomCode } from '../utils/tools'

const lookup = promisify(dns.lookup)

const EXT_BY_MIME: Record<string, string> = {
  'image/png': '.png',
  'image/jpeg': '.jpg',
  'image/jpg': '.jpg',
  'image/webp': '.webp',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
}

function isPrivateAddress(ip: string): boolean {
  if (net.isIPv4(ip)) {
    const p = ip.split('.').map(Number)
    if (p[0] === 10) return true
    if (p[0] === 127) return true
    if (p[0] === 0) return true
    if (p[0] === 169 && p[1] === 254) return true // link-local
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true
    if (p[0] === 192 && p[1] === 168) return true
    return false
  }
  const lower = ip.toLowerCase()
  if (lower === '::1' || lower === '::') return true
  if (lower.startsWith('fc') || lower.startsWith('fd')) return true // ULA
  if (lower.startsWith('fe80')) return true // link-local
  if (lower.startsWith('::ffff:')) return isPrivateAddress(lower.replace('::ffff:', ''))
  return false
}

// Опциональный allowlist доменов источника (через запятую), напр. grsai/supabase.
function hostAllowed(hostname: string): boolean {
  const raw = process.env.ASSET_URL_ALLOWLIST
  if (!raw) return true
  const list = raw.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
  const h = hostname.toLowerCase()
  return list.some((d) => h === d || h.endsWith('.' + d))
}

// Записать буфер картинки в /static/<subdir>/ и вернуть относительный путь.
function persistBuffer(buf: Buffer, mime: string, subdir: string) {
  if (buf.length > 50 * 1024 * 1024) throw { status: 413, msg: 'too large' }

  let width: number | undefined
  let height: number | undefined
  try {
    const dim = sizeOf(buf)
    width = dim.width
    height = dim.height
  } catch (e) {
    // размеры не критичны
  }

  const ext = EXT_BY_MIME[mime] || '.png'
  const name = randomCode(8) + ext
  const folder = `${filePath}${subdir}/`
  checkCreateFolder(folder)
  fs.writeFileSync(`${folder}${name}`, buf)

  return { path: `/static/${subdir}/${name}`, width, height, bytes: buf.length }
}

// Скачать внешний URL в /static/<subdir>/ с защитой от SSRF.
export async function downloadImageToStatic(url: string, subdir = 'psd') {
  if (!/^https?:\/\//i.test(url)) throw { status: 400, msg: 'invalid url' }

  const parsed = new URL(url)
  if (!hostAllowed(parsed.hostname)) throw { status: 403, msg: 'host not allowed' }

  // Анти-SSRF: резолвим хост и блокируем приватные диапазоны.
  try {
    if (net.isIP(parsed.hostname)) {
      if (isPrivateAddress(parsed.hostname)) throw { status: 403, msg: 'private address blocked' }
    } else {
      const { address } = await lookup(parsed.hostname)
      if (isPrivateAddress(address)) throw { status: 403, msg: 'private address blocked' }
    }
  } catch (e: any) {
    if (e && e.status) throw e
    throw { status: 400, msg: 'dns resolution failed' }
  }

  const resp = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout: 30000,
    maxContentLength: 50 * 1024 * 1024,
    maxRedirects: 3,
  })

  const ct = String(resp.headers['content-type'] || '').split(';')[0].trim().toLowerCase()
  if (!ct.startsWith('image/')) throw { status: 415, msg: 'not an image' }

  return persistBuffer(Buffer.from(resp.data), ct, subdir)
}

// Сохранить base64 (с data:-префиксом или без) в /static/<subdir>/.
export function decodeBase64ToStatic(input: string, subdir = 'psd', mimeHint?: string) {
  let mime = (mimeHint || '').toLowerCase()
  let b64 = input.trim()

  const m = b64.match(/^data:([^;,]+)?(?:;base64)?,(.*)$/is)
  if (m) {
    if (m[1]) mime = m[1].toLowerCase()
    b64 = m[2]
  }
  b64 = b64.replace(/\s/g, '')
  if (!b64) throw { status: 422, msg: 'empty base64' }

  let buf: Buffer
  try {
    buf = Buffer.from(b64, 'base64')
  } catch (e) {
    throw { status: 422, msg: 'invalid base64' }
  }
  if (buf.length === 0) throw { status: 422, msg: 'invalid base64' }

  if (!mime || !mime.startsWith('image/')) mime = 'image/png'
  return persistBuffer(buf, mime, subdir)
}

export async function fromUrl(req: Request, res: Response) {
  try {
    const body = req.body || {}
    const { url, base64, dataUrl, mime, subdir = 'psd' } = body
    const safeSubdir = String(subdir).replace(/[^a-zA-Z0-9_-]/g, '') || 'psd'

    const inlineB64 = base64 || dataUrl || (typeof url === 'string' && /^data:/i.test(url) ? url : null)

    let result
    if (inlineB64) {
      result = decodeBase64ToStatic(String(inlineB64), safeSubdir, mime)
    } else if (url) {
      result = await downloadImageToStatic(String(url), safeSubdir)
    } else {
      res.status(422).json({ code: 422, msg: 'url or base64 required' })
      return
    }

    res.status(201).json({ code: 200, data: result })
  } catch (e: any) {
    const status = e && e.status ? e.status : 502
    res.status(status).json({ code: status, msg: e && e.msg ? e.msg : `fetch failed: ${e?.message || e}` })
  }
}

export default { fromUrl, downloadImageToStatic, decodeBase64ToStatic }
