const path = require('path');
const fs = require('fs-extra');

module.exports = {
    scripts: async (req, res, next) => {
        try {
            const pkg = path.join(process.cwd(), 'package.json');
            const {scripts} = await fs.readJson(pkg);
            res.status(200).send({
                success: true,
                data: scripts
            });
        } catch (err) {
            next(err);
        }
    }
}
