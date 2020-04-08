const os = require('os');
const path = require('path');

module.exports = {
    mainPath: path.join(os.homedir(), '.showbox'),
    materialsPath: path.join(os.homedir(), '.showbox/materials')
};
