/**
 * POST /api/asset/from-url — локализация внешней картинки в /static/psd/
 * (нужно для Mode 2/1/3/4: фон от grsai/Supabase сохраняем локально, чтобы
 *  imgUrl был относительным и гарантированно рендерился).
 * См. posteren-api-extension-spec §4.
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

// Скачать внешний URL в /static/<subdir>/ с защитой от SSRF. Возвращает относительный путь.
export async function downloadImageToStatic(
  url: string,
  subdir = 'psd',
): Promise<{ path: string; width?: number; height?: number; bytes: number }> {
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

  const buf = Buffer.from(resp.data)
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

  const ext = EXT_BY_MIME[ct] || '.png'
  const name = randomCode(8) + ext
  const folder = `${filePath}${subdir}/`
  checkCreateFolder(folder)
  fs.writeFileSync(`${folder}${name}`, buf)

  return { path: `/static/${subdir}/${name}`, width, height, bytes: buf.length }
}

export async function fromUrl(req: Request, res: Response) {
  try {
    const { url, subdir = 'psd' } = req.body || {}
    if (!url) {
      res.status(422).json({ code: 422, msg: 'url required' })
      return
    }
    const safeSubdir = String(subdir).replace(/[^a-zA-Z0-9_-]/g, '') || 'psd'
    const result = await downloadImageToStatic(String(url), safeSubdir)
    res.status(201).json({ code: 200, data: result })
  } catch (e: any) {
    const status = e && e.status ? e.status : 502
    res.status(status).json({ code: status, msg: e && e.msg ? e.msg : `fetch failed: ${e?.message || e}` })
  }
}

export default { fromUrl, downloadImageToStatic }
