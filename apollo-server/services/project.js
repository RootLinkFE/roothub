const path = require('path');

module.exports = {
    info: () => {
        const filepath = path.join(process.cwd(), 'package.json')
        const { version, showbox } = require(filepath);
        return {
            type: showbox && showbox.type,
            cwd: process.cwd(),
            version: version
        };
    }
}