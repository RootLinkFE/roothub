const path = require('path');
const fs = require('fs-extra');
const { configPath } = require('../const.js');
const init = require('../init.js');

module.exports = {
    list: async (req, res, next) => {
        try {
            const { recommendMaterials, customMaterials } = await fs.readJson(configPath);
            // const allMaterials = materials.concat(customMaterials);
            res.status(200).send({
                success: true,
                data: {
                    recommendMaterials,
                    customMaterials
                }
            });
        } catch(err) {
            next(err);
        }
    },
    sync: async (req, res, next) => {
        try {
            const result = await init();
            res.status(200).send({
                success: true,
                data: result
            })
        } catch (err) {
            next(err);
        }
    },
    custom: async (req, res, next) => {
        try {
            const { type, alias, name, gitPath } = req.body;
            let data = await fs.readJson(configPath);
            data.customMaterials = data.customMaterials || [];
            data.customMaterials.push({
                type, alias, name, gitPath,
                active: true
            });
            await fs.writeJson(configPath, data);
            res.status(200).send({
                success: true,
                data: data.customMaterials
            });
        } catch(err) {
            next(err);
        }
    }
}
