const path = require('path');
const fs = require('fs');

module.exports = {
    info: () => {
        const file = path.join(process.cwd(), 'package.json');
        const data = fs.readFileSync(file).toString('utf-8');
        const packageJSON = JSON.parse(data);
        return {
            type: packageJSON.magicPark.type,
            cwd: process.cwd(),
            version: packageJSON.version
        };
    }
}