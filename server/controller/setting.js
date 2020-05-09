const fs = require('fs-extra');
const path = require('path');
const { configPath } = require('../const.js');

module.exports = {
    info: async (req, res, next) => {
        try {
            const { downloadPath, activeMaterials, materials, nodeTool } = await fs.readJson(configPath);
            res.status(200).send({
                success: true,
                data: { downloadPath, activeMaterials, materials, nodeTool }
            });
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const { downloadPath, activeMaterials, nodeTool } = req.body;
            console.log(req.body);
            let config = await fs.readJson(configPath);
            config = Object.assign(config, { downloadPath, activeMaterials, nodeTool });
            console.log(config);
            let str = JSON.stringify(config, null , '\t');
            await fs.writeFile(configPath, str);
            res.status(201).send({
                success: true,
                data: { downloadPath, activeMaterials, nodeTool }
            });
        } catch(err) {
            next(err);
        }
    },
    reset: async (req, res, next) => {
        try {
            const defaultConfig = await fs.readJson(path.join(__dirname, '../../project.config.json'));
            console.log(defaultConfig);
            let config = await fs.readJson(configPath);
            config = Object.assign(config, defaultConfig);
            console.log(config);
            let str = JSON.stringify(config, null , '    ');
            await fs.writeFile(configPath, str);
            res.status(201).send({
                success: true,
                data: config
            });
        } catch(err) {
            next(err);
        }
    }
}
