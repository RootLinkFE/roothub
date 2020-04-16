const fs = require('fs-extra');
const path = require('path');
const { mainPath, configPath } = require('../const.js');
const _ = require('lodash');

module.exports = {
    list: async (req, res, next) => {
        try {
            const { materialsName, page, pageSize, name } = req.query;
            let data = await fs.readJson(path.join(mainPath, materialsName, 'materials.json'));
            let blocks = data.list.blocks;
            const pageBlocks = _.chunk(blocks, pageSize); // 分页
            const list = pageBlocks.length ? pageBlocks[page - 1].filter((item) => {
                return item.name.toLocaleLowerCase().indexOf(name) > -1
            }) : [];
            res.status(200).send({
                success: true,
                data: {
                    page: page,
                    pageSize: pageSize,
                    total: blocks.length,
                    list: list
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
            const { downloadPath } = await fs.readJson(configPath);
            const src = path.join(mainPath, materialsName, `blocks/${name}/src`);
            const dest = path.join(process.cwd(), `${downloadPath}/blocks/${name}`);
            await fs.copy(src, dest);
            res.status(200).send({
                success: true,
                data: {
                    name,
                    materialsName,
                    downloadPath: `${downloadPath}/blocks/${name}`
                },
                msg: '区块下载成功'
            })
        } catch(err) {
            next('下载失败');
        }
    }
}
