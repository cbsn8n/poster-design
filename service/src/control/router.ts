/*
 * @Author: ShawnPhang
 * @Date: 2020-07-22 20:13:14
 * @Description: 路由
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-08-12 13:40:13
 */
import rExpress from 'express'
import screenshots from '../service/screenshots'
import fileService from '../service/files'
import userService from '../service/user'
import designService from '../service/design'
import renderService from '../service/render'
import api from './api'
const rRouter = rExpress.Router()

rRouter.get(api.SCREENGHOT, screenshots.screenshots)
rRouter.get(api.PRINTSCREEN, screenshots.printscreen)
rRouter.post(api.UPLOAD, fileService.upload)
rRouter.get(api.USER_IMAGES, userService.getUserImages)
rRouter.post(api.USER_IMAGE_DEL, userService.deleteUserImage)
rRouter.get(api.GET_TEMPLATE_LIST, designService.getTemplates)
rRouter.get(api.GET_TEMPLATE, designService.getDetail)
rRouter.get(api.GET_MATERIAL, designService.getMaterial)
rRouter.get(api.GET_PHOTOS, designService.getPhotos)
rRouter.post(api.UPDATE_TEMPLATE, designService.saveTemplate)
rRouter.post(api.DELETE_TEMPLATE, designService.deleteTemplate)
rRouter.get(api.MY_DESIGNS, designService.getMyDesigns)
rRouter.post(api.RENDER, renderService.render)
rRouter.get(api.TEMPLATE_INFO, renderService.templateInfo)
rRouter.get(api.TEMPLATES_LIST, renderService.listTemplates)

export default rRouter
