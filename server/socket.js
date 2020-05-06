const socket = require('socket.io');
const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const utils = require('./utils');

exports.io = function (server) {
    const io = socket(server);
    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        // 依赖
        socket.on('install dependence', function (data) {
            const ls = spawn('npm', ['install', name, `-${type}`]);
            ls.stdout.on('data', (data) => {
                socket.emit('log push', data.toString());
            });
            ls.stderr.on('data', (data) => {
                socket.emit('log push', data.toString());
            });
        });
        socket.on('uninstall dependence', function (name) {
            const ls = spawn('yarn', ['remove', name, '-DS']);
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
            const ls = spawn('npm', ['run', task], {
                cwd: workingDirectory
            });
            ls.stdout.on('data', (data) => {
                socket.emit('log push', data.toString());
            });
            ls.stderr.on('data', (data) => {
                socket.emit('log push', data.toString());
            });
        })
    });
}

    