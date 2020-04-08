const service =  require('../services/block');
const { materialsPath } = require('../const.js');
const _ = require('lodash');

module.exports = {
    list: async (req, res, next) => {
        try {
            const { type, page, pageSize, name } = req.query;
            const blocks = require(`${materialsPath}/${type}/blocks.json`);
            console.log(blocks);
            const pageBlocks = _.chunk(blocks, pageSize); // 分页
            res.status(200).send({
                success: true,
                data: {
                    page: page,
                    pageSize: pageSize,
                    total: blocks.length,
                    list: pageBlocks[page - 1].filter((item) => {
                        return item.name.toLocaleLowerCase().indexOf(name) > -1
                    })
                }
            });
        } catch(err) {
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
