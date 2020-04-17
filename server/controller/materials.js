const path = require('path');
const fs = require('fs-extra');
const { configPath } = require('../const.js');

module.exports = {
    getProjects: async (req, res) => {
        let { myProjects } = await fs.readJson(configPath);
        res.status(200).send({
            success: true,
            data: myProjects
        });
    },
    addProject: async (req, res, next) => {
        const { path } = req.body;
        let json = await fs.readJson(configPath);
        let myProjects = json.myProjects = json.myProjects || [];
        if (!myProjects.includes(path)) {
            myProjects.push({
                path,
                name: path.split('/').pop()
            });
        }
        await fs.writeJson(configPath, json)
            .then(() => {
                // 同时设置当前工作区
                req.currentDir = path;
                res.status(200).send({success: true});
            })
            .catch(reason => void next(reason))
    },
    list: async (req, res, next) => {
        try {
            const { materials } = await fs.readJson(configPath);
            res.status(200).send({
                success: true,
                data: materials
            });
        } catch(err) {
            next(err);
        }
    }
}
