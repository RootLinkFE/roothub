const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const utils = require('../utils');

module.exports = {
    homedir: (req, res, next) => {
        res.status(200).send({
            success: true,
            data: os.homedir()
        });
    },
    files: (req, res, next) => {
        let { filePath } = req.query;
        filePath = filePath || '/';
        let content;
        //判断访问地址是文件夹还是文件
        let stat = fs.statSync(filePath);
        content = stat.isDirectory() ? utils.walk(filePath) : utils.file(filePath)
        res.status(200).send({
            success: true,
            data: content
        });
    }
}
