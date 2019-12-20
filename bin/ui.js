const spawn = require('cross-spawn');
const path = require('path');

const serverDir = path.join(__dirname, '..', 'apollo-server');

module.exports = () => {
    console.log('🚀 Starting GUI...');

    // 启动服务器
    const server = spawn('supervisor',
    ['-w', serverDir, path.join(serverDir, 'app.js')]);

    server.stdout.on('data', (data) => {
        console.log(`${data}`);
    })
    server.stderr.on('data', (data) => {
        console.log(`${data}`);
    });
    server.on('close', (code) => {
        console.log(`server子进程退出，使用退出码 ${code}`);
    });

    // 启动ui界面
    const ui = spawn('yarn', ['ui'], {
        cwd: path.join(__dirname, '..')
    });
    ui.stdout.on('data', (data) => {
        if (data.indexOf(' App running at:') > -1) {
            console.log(`${data}`);
        }
    })
    ui.stderr.on('data', (data) => {
        // console.log(`${data}`);
    });
    ui.on('close', (code) => {
        console.log(`ui子进程退出，使用退出码 ${code}`);
    });

    // 监听退出子进程
    process.on('exit', function () {
        server.kill();
        ui.kill();
    });
}