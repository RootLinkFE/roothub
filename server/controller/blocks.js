const service =  require('../services/block');
const fs = require('fs-extra');
const path = require('path');
const { materialsPath } = require('../const.js');
const _ = require('lodash');

module.exports = {
    list: async (req, res, next) => {
        try {
            const { type, page, pageSize, name } = req.query;
            const blocks = require(`${materialsPath}/${type}/blocks.json`);
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
        try {
            const { type } = req.query;
            const { name } = req.params;
            const src = path.join(materialsPath, `${type}/blocks/${name}/src`);
            const dest = path.join(process.cwd(), `.showbox/blocks/${name}`);
            console.log(src);
            console.log(dest)
            await fs.copy(src, dest);
            res.status(200).send({
                success: true,
                data: {
                    name,
                    type
                }
            })
        } catch(err) {
            next(err);
        }
    }
}