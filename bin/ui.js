const spawn = require('cross-spawn');
const path = require('path');

const serverDir = path.join(__dirname, '..', 'apollo-server');

module.exports = (args) => {
    console.log('🚀 Starting GUI...');
    const server = spawn('supervisor',
    ['-w', serverDir, path.join(serverDir, 'app.js')]);
    const ui = spawn('yarn', ['ui'], {
        cwd: path.join(__dirname, '..')
    });

    server.stdout.on('data', (data) => {
        console.log(`${data}`);
    })
    server.stderr.on('data', (data) => {
        console.log(`${data}`);
    });
    server.on('close', (code) => {
        console.log(`server子进程退出，使用退出码 ${code}`);
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
    process.on('exit', function () {
        server.kill();
        ui.kill();
    });
}