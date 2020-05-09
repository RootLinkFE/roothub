const socket = require('socket.io');
const path = require('path');
const fs = require('fs-extra');
const spawn = require('cross-spawn');
const utils = require('./utils');
const { configPath } = require('./const');

exports.io = function (server) {
    const { nodeTool, workingDirectory } = fs.readJsonSync(configPath);
    const _exec = {
        yarn: {
            install: 'add',
            uninstall: 'remove'
        },
        npm: {
            install: 'i',
            uninstall: 'uninstall'
        }
    }[nodeTool];
    const io = socket(server);
    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        // 依赖
        socket.on('install dependence', function (msg) {
            const ls = spawn(nodeTool, [_exec.install, msg.name, `-${msg.type}`], {
                cwd: workingDirectory
            });
            ls.stdout.on('data', (data) => {
                socket.emit('log push', data.toString());
            });
            ls.stderr.on('data', (data) => {
                socket.emit('log push', data.toString());
            });
        });
        socket.on('uninstall dependence', function (name) {
            console.log(name);
            const ls = spawn(nodeTool, [_exec.uninstall, name, '-DS'], {
                cwd: workingDirectory
            });
            ls.stdout.on('data', (data) => {
                socket.emit('log push', data.toString());
            });
            ls.stderr.on('data', (data) => {
                socket.emit('log push', data.toString());
            });
        });
        // 任务
        socket.on('exec task', async function (task) {
            const workingDirectory = await utils.getWorkingDirectory();
            let ls;
            if (nodeTool === 'npm') {
                ls = spawn('npm', ['run', task], {
                    cwd: workingDirectory
                });
            } else {
                ls = spawn('yarn', [task], {
                    cwd: workingDirectory
                });
            }
            ls.stdout.on('data', (data) => {
                socket.emit('log push', data.toString());
            });
            ls.stderr.on('data', (data) => {
                socket.emit('log push', data.toString());
            });
        })
    });
}

    