const os = require('os');
const path = require('path');

module.exports = {
    mainPath: path.join(os.homedir(), '.pandora'),
    configPath: path.join(os.homedir(), '.pandora/config.json')
};
