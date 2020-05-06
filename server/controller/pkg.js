const path = require('path');
const fs = require('fs-extra');
const { configPath } = require('../const.js');

module.exports = {
    scripts: async (req, res, next) => {
        try {
            const { workingDirectory } = await fs.readJson(configPath);
            const pkg = path.join(workingDirectory, 'package.json');
            const { scripts } = await fs.readJson(pkg);
            res.status(200).send({
                success: true,
                data: scripts
            });
        } catch (err) {
            next(err);
        }
    }
}
