const express = require('express');
let router = express.Router();
const controller = require('./controller');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log(req.url);
    next()
})

router.get('/project', controller.project.info);
router.get('/materials', controller.materials.list);
router.get('/materials/myProjects', controller.materials.getProjects);
router.post('/materials/project/add', controller.materials.addProject);
router.get('/blocks', controller.blocks.list);
router.get('/blocks/:name', controller.blocks.download);
router.get('/setting', controller.setting.info);
router.patch('/setting', controller.setting.update);
router.patch('/setting/reset', controller.setting.reset);
// router.get('/block/download', controller.block.download);
router.get('/dependence', controller.dependence.dependencies);
router.post('/dependence/install', controller.dependence.install);
// 创建模块
router.get('/create/homeDir', controller.create.homeDir);
router.get('/create/list', controller.create.list);
router.get('/create/getProjectList', controller.create.getProjectList);
router.post('/create/addProject', controller.create.addProject);
router.get('/create/favorite', controller.create.favorite);
router.get('/create/deleteItem', controller.create.deleteItem);
router.get('/create/editItem', controller.create.editItem);
router.get('/create/openEditor', controller.create.openEditor);
router.get('/create/checkHasProject', controller.create.checkHasProject);
router.get('/create/queryIsFavorite', controller.create.queryIsFavorite);
// 收藏的url
router.post('/create/addFavoritePath', controller.create.addFavoritePath);
router.get('/create/queryFavoritePath', controller.create.queryFavoritePath);
router.get('/create/deleteFavoritePath', controller.create.deleteFavoritePath);
// 新建文件夹
router.get('/create/newDir', controller.create.newDir);
router.get('/create/deleteFile', controller.create.deleteFile);


module.exports = router;
