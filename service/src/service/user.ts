/*
 * @Author: ShawnPhang
 * @Date: 2024-05-16 18:25:10
 * @Description: 示例代码，仅供参考
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-08-12 06:25:23
 */
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
const multiparty = require('multiparty')
const { filePath } = require('../configs.ts')
const { checkCreateFolder, filesReader, send } = require('../utils/tools.ts')

const FileUrl = 'http://localhost:7001/static/'

export default {
  // design/user/image/del 删除用户上传文件
  async deleteUserImage(req: any, res: Response) {
    try {
      const { key } = req.body
      if (!key) {
        send.error(res, 'Missing key')
        return
      }
      const targetPath = path.resolve(filePath, key)
      // Prevent path traversal
      if (!targetPath.startsWith(path.resolve(filePath))) {
        send.error(res, 'Invalid key')
        return
      }
      if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath)
      }
      send.success(res, null)
    } catch (err) {
      console.error('Delete error:', err)
      send.error(res, 'Delete failed')
    }
  },

  // design/user/image 获取用户上传列表（虚拟）
  async getUserImages(req: any, res: Response) {
    /**
     * @api {post} /design/user/image 获取用户上传列表（虚拟）
     * @apiVersion 1.0.0
     * @apiGroup user
     */
    const page = parseInt(req.query.page) || 1
    if (page > 1) {
      send.success(res, { list: [] })
      return
    }
    const list = await filesReader('user')
    send.success(res, { list })
  },
}
