const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { configPath } = require('./const.js');

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
            fs.copySync(defaultConfigPath, configPath);
        } else {
            let data = await fs.readJson(configPath);
            data.materials = materials;
            let str = JSON.stringify(data, null, '\t');
            await fs.writeFile(configPath, str);
            if (data.customMaterials) {
                materials = materials.concat(data.customMaterials);
            }
        }
        
        // 遍历官方仓库列表
        materials.forEach(async (item) => {
            let materialsDir = path.join(os.homedir(), `.pandora/${item.name}`);
            if (fs.pathExistsSync(materialsDir)) {
                try {
                    const { stdout } = await exec('git pull', {
                        cwd: materialsDir
                    });
                    console.log(`stdout: ${stdout}`);
                } catch(err) {
                    console.error(err);
                }
            } else {
                try {
                    const { stdout } = await exec(`git clone ${item.gitPath}`, {
                        cwd: mainPath
                    });
                    console.log(`stdout: ${stdout}`);
                } catch(err) {
                    console.error(err);
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
}
