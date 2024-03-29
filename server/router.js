const express = require('express')
let router = express.Router()
const controller = require('./controller')

// middleware that is specific to this router
if (process.env.NODE_ENV === 'development') {
  router.use(function timeLog(req, res, next) {
    next()
  })
}

// 项目信息
router.get('/pkg/scripts', controller.pkg.scripts)
// 物料数据
router.get('/materials', controller.materials.list)
router.get('/materials/sync', controller.materials.sync)
router.post('/materials/custom', controller.materials.custom)
router.patch('/materials/:index', controller.materials.update)
router.delete('/materials/:index', controller.materials.deleteItem)
// 物料-区块
router.get('/blocks', controller.blocks.list)
router.get('/blocks/:name', controller.blocks.download)
//资源数据
router.get('/resource', controller.resource.list)
// 项目设置
router.get('/setting', controller.setting.info)
router.patch('/setting', controller.setting.update)
router.patch('/setting/reset', controller.setting.reset)
// 依赖管理
router.get('/dependence', controller.dependence.dependencies)
// 项目管理
router.get('/myProjects', controller.myProjects.list)
router.delete('/myProjects/:index', controller.myProjects.deleteProject)
router.post('/myProjects', controller.myProjects.add)
// 文件finder
router.get('/finder/homedir', controller.finder.homedir)
router.get('/finder/files', controller.finder.files)
router.get('/finder/open', controller.finder.open)
// 设置/切换工作目录
router.get('/workingDirectory', controller.workingDirectory.getCurrent)
router.patch('/workingDirectory', controller.workingDirectory.setCurrent)
//前端咨询推送
router.get('/news/getSendNewsStatus', controller.news.getSendNewsStatus)
router.post('/news/changeSendNewsConfig', controller.news.changeSendNewsConfig)
router.post('/news/switchSendNews', controller.news.switchSendNews)

// 文件
router.get('/files/launchEditor', controller.files.launchEditor)
module.exports = router
