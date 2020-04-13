const fs = require('fs-extra');
const path = require('path');
const { configPath } = require('../const.js');

module.exports = {
    info: async (req, res, next) => {
        try {
            const config = await fs.readJson(configPath);
            res.status(200).send({
                success: true,
                data: config
            });
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { startPort, downloadPath, materialDevPort } = req.body;
            console.log(req.body);
            let config = await fs.readJson(configPath);
            config = Object.assign(config, { startPort, downloadPath, materialDevPort });
            console.log(config);
            let str = JSON.stringify(config, null , '    ');
            await fs.writeFile(configPath, str);
            console.log('修改配置成功');
            res.status(201).send({
                success: true,
                data: '修改成功'
            });
        } catch(err) {
            next(err);
        }
    }
}
