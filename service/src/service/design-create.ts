/**
 * POST /api/design/create — создать дизайн из произвольного набора слоёв
 *   (Mode 1/3/4). Пишет temp в том же формате/месте, что читает GET /design/temp.
 * GET  /api/design/preview — тонкая обёртка над /api/screenshots.
 * См. posteren-api-extension-spec §5, §6.
 */
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { randomCode } from '../utils/tools'
import { downloadImageToStatic } from './assets'

function publicBase(req: Request): string {
  if (process.env.POSTEREN_PUBLIC_URL) return process.env.POSTEREN_PUBLIC_URL.replace(/\/+$/, '')
  const host = req.get('x-forwarded-host') || req.get('host')
  const proto = req.get('x-forwarded-proto') || req.protocol || 'https'
  return `${proto}://${host}`
}

// Поля слоя, в которых может быть картинка.
const IMG_FIELDS = ['imgUrl', 'url', 'src']

// Локализуем все внешние картинки слоёв в /static/psd/ (imgUrl должен быть локальным).
async function localizePages(pages: any[]): Promise<any[]> {
  for (const page of pages) {
    const layers = page?.layers || []
    for (const layer of layers) {
      for (const field of IMG_FIELDS) {
        const val = layer?.[field]
        if (typeof val === 'string' && /^https?:\/\//i.test(val)) {
          try {
            const { path: localPath } = await downloadImageToStatic(val, 'psd')
            layer.imgUrl = localPath // редактор ожидает imgUrl с относительным путём
            if (field !== 'imgUrl') delete layer[field]
          } catch (e) {
            // оставляем внешний URL как есть, если локализация не удалась
          }
        }
      }
    }
  }
  return pages
}

export async function create(req: Request, res: Response) {
  try {
    const { name, ownerEmail, width, height, pages, meta } = req.body || {}
    if (!ownerEmail) {
      res.status(422).json({ code: 422, msg: 'ownerEmail required' })
      return
    }
    if (!Array.isArray(pages) || pages.length === 0) {
      res.status(422).json({ code: 422, msg: 'pages required' })
      return
    }

    const normalizedPages = await localizePages(pages)

    const tempId = randomCode(8)
    const record = {
      id: tempId,
      title: name || 'Generated',
      width,
      height,
      ownerEmail,
      meta: meta || {},
      data: JSON.stringify(normalizedPages), // строка, как в /design/temp
    }

    const savePath = path.resolve(__dirname, `../mock/templates/${tempId}.json`)
    fs.writeFileSync(savePath, JSON.stringify(record))

    // Регистрируем в списке (для «моих дизайнов»; фильтр по owner — на будущее).
    try {
      const listPath = path.resolve(__dirname, '../mock/templates/list.json')
      const list = JSON.parse(fs.readFileSync(listPath, 'utf8'))
      list.unshift({ id: tempId, cover: '', title: record.title, width, height, ownerEmail })
      fs.writeFileSync(listPath, JSON.stringify(list))
    } catch (e) {
      // список не критичен для открытия по tempId
    }

    const base = publicBase(req)
    res.status(201).json({
      code: 200,
      data: {
        tempId,
        editUrl: `${base}/home?tempid=${tempId}`,
        previewUrl: `${base}/api/screenshots?tempid=${tempId}&width=400`,
      },
    })
  } catch (e: any) {
    res.status(500).json({ code: 500, msg: `create failed: ${e?.message || e}` })
  }
}

// GET /api/design/preview?id=&width=&page= → redirect на /api/screenshots
export function preview(req: Request, res: Response) {
  const id = req.query.id
  if (!id) {
    res.status(422).json({ code: 422, msg: 'id required' })
    return
  }
  const width = Number(req.query.width) || 400
  const page = Number(req.query.page) || 1
  const index = Math.max(0, page - 1)
  res.redirect(302, `/api/screenshots?tempid=${id}&width=${width}&index=${index}`)
}

export default { create, preview }
