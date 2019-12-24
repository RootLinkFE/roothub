const path = require('path');

module.exports = {
    info: () => {
        const filepath = path.join(process.cwd(), 'package.json')
        const { version, magicPark } = require(filepath);
        return {
            type: magicPark && magicPark.type,
            cwd: process.cwd(),
            version: version
        };
    }
}