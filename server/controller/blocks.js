const fs = require('fs-extra');
const path = require('path');
const { mainPath, configPath } = require('../const.js');
const _ = require('lodash');

module.exports = {
  list: async (req, res, next) => {
    let { materialsName, page, pageSize, name, category, tag } = req.query;
    try {
      name = name || '';
      let data = await fs.readJson(
        path.join(mainPath, materialsName, 'materials.json')
      );
      let blocks = data.list?.blocks
        ?.filter((item) => {
          let tags = item.tags.map((v) => {
            return v.toLocaleLowerCase();
          });
          let hasName = false;
          if (name) {
            hasName =
              item.name.indexOf(name) > -1 ||
              item.description.indexOf(name) > -1 ||
              tags.indexOf(name) > -1;
            return hasName;
          } else {
            return true;
          }
        })
        .filter((item) => {
          if (category === '全部') return true;
          const hasTag = item.tags.includes(tag);
          const sameType = item.type === category;
          if (Array.isArray(item.category)) {
            return item.category.includes(category) || hasTag || sameType;
          } else {
            return item.category === category || hasTag || sameType;
          }
        });

      const pageBlocks = _.chunk(blocks, pageSize); // 分页
      res.status(200).send({
        success: true,
        data: {
          page: page,
          pageSize: pageSize,
          total: blocks?.length,
          list: pageBlocks[page - 1] || [],
        },
      });
    } catch (err) {
      console.log(err);
      if (err.message?.indexOf('no such file or directory') !== -1) {
        next({
          message: `当前物料「${materialsName}」配置文件materials.json 获取失败，请先同步物料库`,
        });
      } else {
        next(err);
      }
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
      const dest = path.join(workingDirectory, `${downloadPath}/${name}`);
      await fs.copy(src, dest);
      res.status(200).send({
        success: true,
        data: {
          name,
          materialsName,
          downloadPath: `${downloadPath}/${name}`,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
