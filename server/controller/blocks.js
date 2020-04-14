const fs = require('fs-extra');
const path = require('path');
const { mainPath } = require('../const.js');
const _ = require('lodash');

module.exports = {
    list: async (req, res, next) => {
        try {
            const { materialsName, page, pageSize, name } = req.query;
            let data = await fs.readJson(path.join(mainPath, materialsName, 'materials.json'));
            let blocks = data.list.blocks;
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
            const { materialsName } = req.query;
            const { name } = req.params;
            const src = path.join(mainPath, materialsName, `blocks/${name}/src`);
            const dest = path.join(process.cwd(), `.showbox/blocks/${name}`);
            await fs.copy(src, dest);
            res.status(200).send({
                success: true,
                data: {
                    name,
                    materialsName
                },
                msg: '区块下载成功'
            })
        } catch(err) {
            next('下载失败');
        }
    }
}
