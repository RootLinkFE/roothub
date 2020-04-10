const spawn = require('cross-spawn');
const path = require('path');
const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec;

const serverDir = path.join(__dirname, '..', 'server');

module.exports = () => {
    console.log('🚀 Starting GUI...');
    console.log('船新版本');
    const mainPath = path.join(os.homedir(), '.showbox');
    const materialsPath = path.join(os.homedir(), '.showbox/materials'); // 物料仓库路径
    // 第一次启动clone物料仓库到本地
    if (!fs.existsSync(mainPath)) {
        fs.mkdirSync(mainPath);
        exec('git clone git@git.souche-inc.com:loan/magic-park/materials.git', {
            cwd: mainPath
        }, (error, stdout, stderr) => {
            if (error) {
              console.error(`执行的错误: ${error}`);
              throw error;
            }
            console.log(`stdout: ${stdout}`);
        });
    } else {
        // 更新仓库
        exec('git pull', {
            cwd: materialsPath
        }, (error, stdout, stderr) => {
            if (error) {
              console.error(`执行的错误: ${error}`);
              throw error;
            }
            console.log(`stdout: ${stdout}`);
        });
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
