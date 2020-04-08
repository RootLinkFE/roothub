const path = require('path');

module.exports = {
    info: () => {
        const filepath = path.join(process.cwd(), 'package.json');
        //delete require.cache[require.resolve(filepath)];
        const { version, showbox } = require(filepath);
        console.log(version);
        return {
            type: showbox && showbox.type,
            cwd: process.cwd(),
            version: version
        };
    }
}