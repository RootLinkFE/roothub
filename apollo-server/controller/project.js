const service = require('../services/project');

module.exports = {
    info: (req, res) => {
        const result = service.info();
        res.send(result);
    }
}