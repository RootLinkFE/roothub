const path = require('path');
const fs = require('fs-extra');
const { configPath } = require('../const.js');

module.exports = {
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
