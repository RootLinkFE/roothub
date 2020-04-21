const path = require('path');
const fs = require('fs-extra');
const { configPath } = require('../const.js');

module.exports = {
    add: async (req, res, next) => {
        try {
            const { currentPath, name } = req.body;
            console.log('当前路径：' + currentPath)
            let data = await fs.readJson(configPath);
            const isExist = data.myProjects.filter((item) => {
                return item.path === currentPath;
            });
            if (isExist.length) {
                throw new Error('项目已存在，请勿重复导入');
            } else {
                data.myProjects.push({
                    name: name,
                    path: currentPath
                });
            }
            await fs.writeJson(configPath, data);
            res.status(201).send({
                success: true,
                data: data.myProjects,
                message: '导入成功'
            });
        } catch(err) {
            next(err);
        }
    },
    list: async (req, res, next) => {
        try {
            let { myProjects } = await fs.readJson(configPath);
            myProjects = myProjects || [];
            res.status(200).send({
                success: true,
                data: myProjects
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
    deleteProject: async (req, res, next) => {
        try {
            const { index } = req.params;
            console.log(index)
            let data = await fs.readJson(configPath);
            data.myProjects.splice(index, 1);
            await fs.writeJson(configPath, data);
            res.status(201).send({
                success: true,
                data: data.myProjects,
                message: '删除成功'
            });
        } catch(err) {
            next(err);
        }
    }
}
