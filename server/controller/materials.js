const path = require('path');
const fs = require('fs-extra');
const { configPath } = require('../const.js');
const init = require('../init.js');

module.exports = {
    list: async (req, res, next) => {
        try {
            const { materials, activeMaterials } = await fs.readJson(configPath);
            const data = materials.filter((v) => {
                return activeMaterials.includes(v.name);
            })
            res.status(200).send({
                success: true,
                data: data
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
    }
}
