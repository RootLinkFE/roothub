const os = require('os');
const path = require('path');

module.exports = {
    mainPath: path.join(os.homedir(), '.showbox'),
    configPath: path.join(os.homedir(), '.showbox/config.json'),
    materialsPath: path.join(os.homedir(), '.showbox/materials')
};
