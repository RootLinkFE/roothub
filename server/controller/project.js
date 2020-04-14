const path = require('path');

module.exports = {
    info: (req, res, next) => {
        try {
            const filepath = path.join(process.cwd(), 'package.json');
            const { version, showbox } = require(filepath);
            res.status(200).send({
                success: true,
                data: {
                    type: showbox && showbox.type,
                    cwd: process.cwd(),
                    version: version
                }
            });
        } catch(err) {
            next(err);
        }
    }
}
