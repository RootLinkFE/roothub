const path = require('path');
const fs = require('fs-extra');
const utils = require('../utils');
const { configPath } = require('../const');

module.exports = {
    getCurrent: async (req, res, next) => {
        try {
            const workingDirectory = await utils.getWorkingDirectory();
            res.status(200).send({
                success: true,
                data: workingDirectory
            });
        } catch (err) {
            next(err);
        }
    },
    setCurrent: async (req, res, next) => {
        try {
            const { dir } = req.body;
            let data = await fs.readJson(configPath);
            data.workingDirectory = dir;
            await fs.writeJson(configPath, data);
            res.status(201).send({
                success: true,
                data: dir
            });
        } catch (err) {
            next(err);
        }
    }
}
