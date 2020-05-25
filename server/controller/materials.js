const path = require('path');
const fs = require('fs-extra');
const { configPath, recommendMaterialsPath } = require('../const.js');
const init = require('../init.js');

module.exports = {
    list: async (req, res, next) => {
        try {
            const recommendMaterials = await fs.readJson(recommendMaterialsPath);
            const { customMaterials } = await fs.readJson(configPath);
            res.status(200).send({
                success: true,
                data: {
                    recommendMaterials,
                    customMaterials: customMaterials || [] // 兼容旧版本
                }
            });
        } catch(err) {
            next(err);
        }
    },
    sync: async (req, res, next) => {
        try {
            const result = await init();
            res.status(200).send({
                success: true,
                data: result
            })
        } catch (err) {
            next(err);
        }
    },
    custom: async (req, res, next) => {
        try {
            const { type, alias, name, gitPath, description } = req.body;
            const recommendMaterials = await fs.readJson(recommendMaterialsPath);
            let data = await fs.readJson(configPath);
            const allMaterials = recommendMaterials.concat(data.customMaterials || []);
            for(let i = 0, len = allMaterials.length; i < len; i++) {
                if (allMaterials[i].alias === alias) {
                    throw new Error(`${alias}已存在，请换个名称`);
                }
            }
            data.customMaterials = data.customMaterials || [];
            data.customMaterials.push({
                type,
                alias,
                name,
                gitPath,
                description,
                active: true
            });
            await fs.writeJson(configPath, data);
            res.status(200).send({
                success: true,
                data: data.customMaterials
            });
        } catch(err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            let data;
            const { index } = req.params;
            const { type, update } = req.body;
            if (type === 'recommendMaterials') {
                data = await fs.readJson(recommendMaterialsPath);
                data[index] = update;
                await fs.writeJson(recommendMaterialsPath, data);
            } else {
                data = await fs.readJson(configPath);
                data.customMaterials[index] = update;
                await fs.writeJson(configPath, data);
            }
            res.status(200).send({
                success: true,
                data: '修改成功'
            });
        } catch(err) {
            next(err);
        }
    },
    deleteItem: async (req, res, next) => {
        try {
            const { index } = req.params;
            let data = await fs.readJson(configPath);
            data.customMaterials.splice(index, 1);
            await fs.writeJson(configPath, data);
            res.status(201).send({
                success: true,
                data: data.customMaterials,
                message: '删除成功'
            });
        } catch(err) {
            next(err);
        }
    }
}
