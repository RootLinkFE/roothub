const path = require('path');
const fs = require('fs-extra');
const { configPath } = require('../const.js');

module.exports = {
    list: async (req, res, next) => {
        try {
            const { materials } = await fs.readJson(configPath);
            res.status(200).send({
                success: true,
                data: materials
            });
        } catch(err) {
            next(err);
        }
    }
}
