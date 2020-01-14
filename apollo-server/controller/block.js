const service =  require('../services/block');

module.exports = {
    list: async (req, res, next) => {
        const { agent, framework } = req.query;
        try {
            const result = await service.list(agent, framework);
            res.success(result);
        } catch (err) {
            next(err);
        }
    },
    download: async (req, res, next) => {
        const { framework, name } = req.query;
        try {
            const result = await service.download(framework, name);
            res.success(result);
        } catch(err) {
            next(err);
        }
    }
}