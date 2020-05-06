const fs = require('fs-extra');
const path = require('path');
const { mainPath, configPath } = require('../const.js');
const _ = require('lodash');

module.exports = {
    list: async (req, res, next) => {
        try {
            let { materialsName, page, pageSize, name, category } = req.query;
            name = name || '';
            let data = await fs.readJson(path.join(mainPath, materialsName, 'materials.json'));
            let blocks = data.list.blocks.filter((item) => {
                return item.name.toLocaleLowerCase().indexOf(name) > -1 || item.description.indexOf(name) > -1;
            }).filter((item) => {
                if (category === '全部') return true;
                return item.category === category;
            });
            const pageBlocks = _.chunk(blocks, pageSize); // 分页
            res.status(200).send({
                success: true,
                data: {
                    page: page,
                    pageSize: pageSize,
                    total: blocks.length,
                    list: pageBlocks[ page - 1] || []
                }
            });
        } catch(err) {
            next(err);
        }
    },
    download: async (req, res, next) => {
        try {
            const { downloadPath, workingDirectory } = await fs.readJson(configPath);
            if (!workingDirectory) {
                throw new Error('请先设置工作目录');
            }
            const { materialsName, blockPath } = req.query;
            const { name } = req.params;
            const src = path.join(mainPath, materialsName, `${blockPath}/src`);
            const dest = path.join(workingDirectory, `${downloadPath}/blocks/${name}`);
            await fs.copy(src, dest);
            res.status(200).send({
                success: true,
                data: {
                    name,
                    materialsName,
                    downloadPath: `${downloadPath}/blocks/${name}`
                }
            })
        } catch(err) {
            next(err);
        }
    }
}
