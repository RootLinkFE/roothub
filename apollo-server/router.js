const express = require('express');
let router = express.Router();
const controller = require('./controller');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log(req.url);
    next()
})

router.get('/project', controller.project.info);
router.get('/block/list', controller.block.list);
router.get('/block/download', controller.block.download);
router.get('/dependence', controller.dependence.dependencies);
router.post('/dependence/install', controller.dependence.install);
router.get('/create/list', controller.create.list);

module.exports = router;