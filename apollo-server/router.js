const express = require('express');
let router = express.Router();
const controller = require('./controller');

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now());
    console.log(req.url);
    next()
})

router.get('/downloadBlock', controller.downloadBlock);

module.exports = router;