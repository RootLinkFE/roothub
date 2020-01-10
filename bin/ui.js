const spawn = require('cross-spawn');
const path = require('path');

const serverDir = path.join(__dirname, '..', 'apollo-server');

module.exports = () => {
    console.log('🚀 Starting GUI...');

    // 开发时启动服务器
    // const server = spawn('supervisor',
    // ['-w', serverDir, path.join(serverDir, 'app.js')]);

    const server = spawn('node',
    [path.join(serverDir, 'app.js')]);

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
    process.on('exit', function () {
        server.kill();
    });
}