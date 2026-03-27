/*
 * @Author: ShawnPhang
 * @Date: 2024-05-16 18:25:10
 * @Description: 示例代码，仅供参考
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-08-17 11:22:42
 */
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import axios from '../utils/http'
import multiparty from 'multiparty'
import { filePath } from '../configs'
import { checkCreateFolder, randomCode, send } from '../utils/tools'

const FileUrl = 'http://localhost:7001/static/'


// design/list 获取模板列表
export async function getTemplates(req: any, res: Response) {
  const { cate, type, page = 1 } = req.query
  if (Number(page) > 1) {
    send.success(res, { list: [] })
    return
  }
  const tempPath = type == 1 ? `../mock/components/list/${cate}.json` : '../mock/templates/list.json'
  try {
    const list = fs.readFileSync(path.resolve(__dirname, tempPath), 'utf8')
    send.success(res, { list: JSON.parse(list) })
  } catch (error) {
    send.success(res, { list: [] })
  }
}

// design/temp 获取模板（虚拟）
export async function getDetail(req: any, res: Response) {
  /**
   * @api {get} /design/list 获取模板（虚拟）
   * @apiVersion 1.0.0
   * @apiGroup design
   */
  const { cate, type, id } = req.query
  const dPath = type == 1 ? `../mock/components/detail/${id}.json` : `../mock/templates/${id}.json`
  try {
    const detail = fs.readFileSync(path.resolve(__dirname, dPath), 'utf8')
    send.success(res, JSON.parse(detail))
  } catch (error) {}
}

// design/material 获取素材（虚拟）
export async function getMaterial(req: any, res: any) {
  /**
   * @api {get} /design/material 获取素材（虚拟）
   * @apiVersion 1.0.0
   * @apiGroup design
   */
  const { cate } = req.query
  try {
    const detail = fs.readFileSync(path.resolve(__dirname, `../mock/materials/${cate}.json`), 'utf8')
    send.success(res, { list: JSON.parse(detail) })
  } catch (error) {
    console.log(error)
  }
}

// design/imgs 获取照片素材（虚拟）
export async function getPhotos(req: any, res: any) {
  /**
   * @api {get} /design/imgs 获取照片素材（虚拟）
   * @apiVersion 1.0.0
   * @apiGroup design
   */
  const { cate } = req.query
  try {
    const detail = fs.readFileSync(path.resolve(__dirname, `../mock/materials/photos/${cate}.json`), 'utf8')
    send.success(res, { list: JSON.parse(detail) })
  } catch (error) {}
}

// design/edit 保存模板（虚拟）
export async function saveTemplate(req: any, res: any) {
  /**
   * @api {post} /design/edit 保存模板（虚拟）
   * @apiVersion 1.0.0
   * @apiGroup design
   */
  let { id, title, data, width, height, type, cate, tag } = req.body
  const folder = type == 1 ? 'components/detail' : 'templates'
  const listPath = type == 1 ? 'components/list/comp.json' : 'templates/list.json'
  try {
    const isAdd = !id // 是否新增模板
    id = id || randomCode(8)
    const savePath = path.resolve(__dirname, `../mock/${folder}/${id}.json`)
    const jsonData = {
      id,
      data,
      title,
      width,
      height,
    }
    fs.writeFileSync(savePath, JSON.stringify(jsonData))
    // 生成封面 (non-blocking, don't wait)
    const size = width > height ? 640 : 320
    const fetchScreenshotUrl = `http://localhost:7001/api/screenshots?tempid=${id}&tempType=${type}&width=${width}&height=${height}&type=cover&size=${size}&quality=75`
    axios.get(fetchScreenshotUrl, { responseType: 'arraybuffer', timeout: 30000 }).catch((e: any) => console.log('Cover generation failed:', e.message))
    // 保存到其他地方可以设置 responseType: 'arraybuffer' 后操作buffer，这里只为了得到封面，发起请求就可以了
    if (isAdd) {
      const listVal = fs.readFileSync(path.resolve(__dirname, `../mock/${listPath}`), 'utf8')
      const list = JSON.parse(listVal)
      const cover = type == 1 ? FileUrl + `/${id}-screenshot.png` : FileUrl + `/${id}-cover.jpg`
      list.unshift({ id, cover, title, width, height })
      fs.writeFileSync(path.resolve(__dirname, `../mock/${listPath}`), JSON.stringify(list))
    }
    send.success(res, { id })
  } catch (error) {
    console.log(error)
  }
}

export default {
  getTemplates,
  getDetail,
  getMaterial,
  getPhotos,
  saveTemplate,
  deleteTemplate,
  getMyDesigns
}

// design/poster/del 删除模板
export async function deleteTemplate(req: any, res: Response) {
  try {
    const { id } = req.body
    if (!id) {
      send.error(res, 'Missing id')
      return
    }
    // Delete template JSON
    const templatePath = path.resolve(__dirname, `../mock/templates/${id}.json`)
    if (fs.existsSync(templatePath)) fs.unlinkSync(templatePath)
    // Delete cover files
    const coverJpg = filePath + `${id}-cover.jpg`
    const coverPng = filePath + `${id}-screenshot.png`
    if (fs.existsSync(coverJpg)) fs.unlinkSync(coverJpg)
    if (fs.existsSync(coverPng)) fs.unlinkSync(coverPng)
    // Remove from list
    const listPath = path.resolve(__dirname, '../mock/templates/list.json')
    try {
      const listVal = fs.readFileSync(listPath, 'utf8')
      const list = JSON.parse(listVal).filter((item: any) => item.id !== id)
      fs.writeFileSync(listPath, JSON.stringify(list))
    } catch (e) {}
    send.success(res, null)
  } catch (error) {
    console.error('Delete template error:', error)
    send.error(res, 'Delete failed')
  }
}

// design/my 获取用户模板列表
export async function getMyDesigns(req: any, res: Response) {
  const page = parseInt(req.query.page) || 1
  if (page > 1) {
    send.success(res, { list: [] })
    return
  }
  try {
    const listVal = fs.readFileSync(path.resolve(__dirname, '../mock/templates/list.json'), 'utf8')
    send.success(res, { list: JSON.parse(listVal) })
  } catch (error) {
    send.success(res, { list: [] })
  }
}
