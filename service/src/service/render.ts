/**
 * API Render Service
 * POST /api/render - render a template with text substitutions, return PNG
 * GET /api/template-info - get template text layers info
 */
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { randomCode, send } from '../utils/tools'

// GET /api/template-info?id=xxx - list text layers in a template
export async function templateInfo(req: Request, res: Response) {
  const { id } = req.query
  if (!id) {
    res.json({ code: 400, msg: 'Missing id parameter' })
    return
  }
  try {
    const tplPath = path.resolve(__dirname, `../mock/templates/${id}.json`)
    const raw = fs.readFileSync(tplPath, 'utf8')
    const tpl = JSON.parse(raw)
    const data = typeof tpl.data === 'string' ? JSON.parse(tpl.data) : tpl.data

    // Support both formats: [{global, layers}] and {page, widgets}
    let textLayers: any[] = []
    if (Array.isArray(data)) {
      // Old format: [{global, layers}]
      const layers = data[0]?.layers || []
      textLayers = layers
        .map((l: any, i: number) => ({ index: i, type: l.type, text: l.text || '' }))
        .filter((l: any) => l.type === 'w-text')
    } else if (data.widgets) {
      // New format: {page, widgets}
      textLayers = data.widgets
        .map((w: any, i: number) => ({ index: i, type: w.type, text: w.text || '' }))
        .filter((w: any) => w.type === 'w-text')
    }

    res.json({
      code: 200,
      data: {
        id: tpl.id,
        title: tpl.title,
        width: tpl.width,
        height: tpl.height,
        textLayers,
      },
    })
  } catch (e: any) {
    res.json({ code: 404, msg: `Template not found: ${e.message}` })
  }
}

// POST /api/render
// Body: { templateId, texts: [{index, text}], width?, height?, quality? }
export async function render(req: Request, res: Response) {
  const { templateId, texts, quality = 90 } = req.body
  if (!templateId) {
    res.json({ code: 400, msg: 'Missing templateId' })
    return
  }

  try {
    // 1. Load template
    const tplPath = path.resolve(__dirname, `../mock/templates/${templateId}.json`)
    const raw = fs.readFileSync(tplPath, 'utf8')
    const tpl = JSON.parse(raw)
    const data = typeof tpl.data === 'string' ? JSON.parse(tpl.data) : tpl.data

    // 2. Apply text substitutions
    if (Array.isArray(texts) && texts.length > 0) {
      if (Array.isArray(data)) {
        // Old format: [{global, layers}]
        const layers = data[0]?.layers || []
        for (const sub of texts) {
          if (typeof sub.index === 'number' && layers[sub.index]) {
            layers[sub.index].text = sub.text
          }
        }
      } else if (data.widgets) {
        // New format: {page, widgets}
        for (const sub of texts) {
          if (typeof sub.index === 'number' && data.widgets[sub.index]) {
            data.widgets[sub.index].text = sub.text
          }
        }
      }
    }

    // 3. Save as temporary template
    const tempId = `render_${randomCode(12)}`
    const tempTpl = {
      id: tempId,
      data: JSON.stringify(data),
      title: tpl.title,
      width: tpl.width,
      height: tpl.height,
    }
    const tempPath = path.resolve(__dirname, `../mock/templates/${tempId}.json`)
    fs.writeFileSync(tempPath, JSON.stringify(tempTpl))

    // 4. Return URLs for the modified template
    // The draw page will load the template and render it in the browser
    const drawUrl = `/draw?tempid=${tempId}`
    const editUrl = `/home?tempid=${tempId}`

    res.json({
      code: 200,
      data: {
        tempId,
        drawUrl,
        editUrl,
        width: tpl.width,
        height: tpl.height,
        title: tpl.title,
      },
    })
  } catch (e: any) {
    res.json({ code: 500, msg: `Error: ${e.message}` })
  }
}

// GET /api/templates - list all available templates
export async function listTemplates(req: Request, res: Response) {
  try {
    const listPath = path.resolve(__dirname, '../mock/templates/list.json')
    const raw = fs.readFileSync(listPath, 'utf8')
    const list = JSON.parse(raw)
    res.json({
      code: 200,
      data: list.map((t: any) => ({
        id: t.id,
        title: t.title || '',
        width: t.width,
        height: t.height,
        cover: t.cover || '',
      })),
    })
  } catch (e: any) {
    res.json({ code: 200, data: [] })
  }
}

export default { render, templateInfo, listTemplates }
