const spawn = require('cross-spawn');
const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { configPath } = require('../server/const.js');

async function init() {
    try {
        const mainPath = path.join(os.homedir(), '.showbox'); // 主目录
        var materials = [];
        if (!fs.pathExistsSync(mainPath)) {
            fs.mkdirSync(mainPath);
        }
        const defaultConfigPath = path.join(__dirname, '../project.config.json');
        const defaultConfig = await fs.readJson(defaultConfigPath); // 默认设置
        materials = defaultConfig.materials;
        console.log(defaultConfig);
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
            let materialsDir = path.join(os.homedir(), `.showbox/${item.name}`);
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

module.exports = async () => {
    console.log('🚀 Starting GUI...');
    init(); // 初始化仓库和配置
    // 开发时启动服务器
    const serverDir = path.join(__dirname, '..', 'server');
    const server = spawn('supervisor', ['-w', serverDir, path.join(serverDir, 'app.js')]);
    const ui = spawn('yarn', ['ui'], {
        cwd: path.join(__dirname, '..')
    });
    ui.stdout.pipe(process.stdout);

    // const server = spawn('node',
    // [path.join(serverDir, 'app.js')]);

    server.stdout.on('data', (data) => {
        console.log(`${data}`);
    })
    server.stderr.on('data', (data) => {
        console.log(`${data}`);
    });
    server.on('close', (code) => {
        console.log(`子进程退出，使用退出码 ${code}`);
    });

    // 监听退出子进程
    process.on('exit', function() {
        server.kill();
        ui.kill();
    });
}
