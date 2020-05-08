const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { configPath } = require('./const.js');

// 物料数据转换
async function materialsTranslate(item, materialsDir) {
    if (item.name === 'ant-design-blocks') {
        try {
            let newJson = {...item, list: {}};
            let data = await fs.readJson(path.join(materialsDir, item.jsonFile));
            // 有null，先过滤
            newJson.list.blocks = data.blocks.filter((v) => v).map(function(v) {
                return {
                    name: v.key,
                    description: v.description,
                    sourceCode: v.url,
                    screenshot: v.img,
                    category: v.tags && v.tags[0],
                    tags: v.features,
                    type: v.type,
                    previewUrl: v.previewUrl,
                    downloadPath: v.defaultPath
                }
            });
            const dest = path.join(materialsDir, 'materials.json');
            let str = JSON.stringify(newJson, null , '\t');
            await fs.writeFile(dest, str);
        } catch(err) {
            console.error(err);
        }
    }
}

function _init () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2)
        }, 2000);
    })
}
module.exports = async function init() {
    try {
        const mainPath = path.join(os.homedir(), '.pandora'); // 主目录
        var materials = [];
        if (!fs.pathExistsSync(mainPath)) {
            fs.mkdirSync(mainPath);
        }
        const defaultConfigPath = path.join(__dirname, '../project.config.json');
        const defaultConfig = await fs.readJson(defaultConfigPath); // 默认设置
        materials = defaultConfig.materials;
        // 添加/更新配置文件
        if (!fs.pathExistsSync(configPath)) {
            await fs.copy(defaultConfigPath, configPath);
        } else {
            let data = await fs.readJson(configPath);
            data.materials = materials;
            data.nodeTool = data.nodeTool || defaultConfig.nodeTool;
            let str = JSON.stringify(data, null, '\t');
            await fs.writeFile(configPath, str);
            if (data.customMaterials) {
                materials = materials.concat(data.customMaterials);
            }
        }
        // 遍历仓库列表
        for (const item of materials) {
            let materialsDir = path.join(os.homedir(), `.pandora/${item.name}`);
            if (fs.pathExistsSync(materialsDir)) {
                const { stdout } = await exec('git pull', {
                    cwd: materialsDir
                });
                materialsTranslate(item, materialsDir);
                console.log(`stdout: ${stdout}`);
            } else {
                const { stdout } = await exec(`git clone ${item.gitPath}`, {
                    cwd: mainPath
                });
                materialsTranslate(item, materialsDir);
                console.log(`stdout: ${stdout}`);
            }
        };
        console.log('初始化结束');
        return '初始化成功';
    } catch (err) {
        console.error(err);
    }
}
