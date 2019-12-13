const service = require('../services/dependence');

module.exports = {
    dependencies: async (req, res) => {
        try { 
            let result = await service.dependencies();
            res.send(result);
        } catch (err) {
            res.send(err);
        }
    },
    install: async (req, res) => {

    }
}