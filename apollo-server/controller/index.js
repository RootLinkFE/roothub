const Api = require('../api');

module.exports = {
    downloadBlock: async (req, res) => {
        const { projectId, blockName } = req.query;
        const result = await Api.get(`/projects/${projectId}/repository/files/blocks.json/raw`);
        res.send(result);
    }
}