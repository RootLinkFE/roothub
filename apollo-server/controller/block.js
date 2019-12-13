const service =  require('../services/block');

module.exports = {
    list: async (req, res) => {
        const { agent, framework } = req.query;
        try {
            const result = await service.list(agent, framework);
            res.send(result);
        } catch (err) {
            res.send(err);
        }
    },
    download: async (req, res) => {
        const { framework, name } = req.query;
        try {
            const result = await service.download(framework, name);
            res.send(result);
        } catch(err) {
            res.send(err);
        }
    }
}