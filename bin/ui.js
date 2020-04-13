const spawn = require('cross-spawn');
const path = require('path');
const os = require('os');
const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { configPath } = require('../const.js');

const serverDir = path.join(__dirname, '..', 'server');

module.exports = async () => {
    try {
        console.log('🚀 Starting GUI...');
        const mainPath = path.join(os.homedir(), '.showbox');
        const materialsPath = path.join(os.homedir(), '.showbox/materials'); // 物料仓库路径
        // 第一次启动clone物料仓库到本地
        if (!fs.pathExistsSync(mainPath)) {
            fs.mkdirSync(mainPath);
            const {stdout } = await exec('git clone git@git.souche-inc.com:loan/magic-park/materials.git', {
                cwd: mainPath
            });
            console.log(`stdout: ${stdout}`);
        } else {
            // 更新仓库
            const {stdout } = await exec('git pull', {
                cwd: materialsPath
            });
            console.log(`stdout: ${stdout}`);
        }

        // 添加配置文件
        if (!fs.pathExistsSync(configPath)) {
            const src = path.join(__dirname, '../project.config.json');
            fs.copySync(src, configPath);
        }
    } catch (err) {
        console.error(err);
    }
    // 开发时启动服务器
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
