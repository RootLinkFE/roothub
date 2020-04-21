const spawn = require('cross-spawn');
const path = require('path');

module.exports = async () => {
    console.log('🚀 Starting GUI...');
    const serverDir = path.join(__dirname, '..', 'server');
    let server;
    server = spawn('node', [path.join(serverDir, 'app.js')]);
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
    });
}
