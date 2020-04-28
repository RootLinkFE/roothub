const express = require('express');
let router = express.Router();
const controller = require('./controller');

// middleware that is specific to this router
if(process.env.NODE_ENV === 'development') {
    router.use(function timeLog (req, res, next) {
        console.log(req.url);
        next()
    })
}

// 物料数据
router.get('/materials', controller.materials.list);
// 物料-区块
router.get('/blocks', controller.blocks.list);
router.get('/blocks/:name', controller.blocks.download);
// 项目设置
router.get('/setting', controller.setting.info);
router.patch('/setting', controller.setting.update);
router.patch('/setting/reset', controller.setting.reset);
// 依赖管理
router.get('/dependence', controller.dependence.dependencies);
router.post('/dependence/install', controller.dependence.install);
// 项目管理
router.get('/myProjects', controller.myProjects.list);
router.delete('/myProjects/:index', controller.myProjects.deleteProject);
router.post('/myProjects', controller.myProjects.add);
// 文件finder
router.get('/finder/homedir', controller.finder.homedir);
router.get('/finder/files', controller.finder.files);
router.get('/finder/open', controller.finder.open);
// 设置/切换工作目录
router.get('/workingDirectory', controller.workingDirectory.getCurrent);
router.patch('/workingDirectory', controller.workingDirectory.setCurrent);

module.exports = router;
