const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const server = require('http').Server(app);
// const io = require('./socket').io(server);
const router = require('./router');
const path = require('path');
const fs = require('fs-extra');
const { openUrl } = require('./utils');
const init = require('./init');
const CACHE_CONTROL = 'no-store, no-cache, must-revalidate, private'

const PORT = 8111;
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(express.static(path.resolve(__dirname, '../dist'), { setHeaders }));
app.use(function(req, res, next) {
    res.success = function(data) {
        res.send({
            code: 200,
            data,
            success: true
        });
    }
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(function(err, req, res, next) {
    console.log(err);
    res.status(500).send({
        code: 500,
        success: false,
        message: err.message
    });
});

// 初始化配置
init();

console.log('环境变量' + process.env.NODE_ENV);


server.listen(PORT, () => {
    if(process.env.NODE_ENV === 'development') {
        console.log(`🚀 Server ready at http://localhost:${PORT}`);
    } else {
        openUrl(`http://localhost:${PORT}`);
    }
})

function setHeaders(res) {
    res.set('Cache-Control', CACHE_CONTROL)
}

module.exports = server;
