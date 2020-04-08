const service = require('../services/dependence');

module.exports = {
    dependencies: async (req, res, next) => {
        try { 
            let result = await service.dependencies();
            res.success(result);
        } catch (err) {
            next(err);
        }
    },
    install: async (req, res) => {

    }
}