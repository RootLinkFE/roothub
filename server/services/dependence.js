const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');



module.exports = {
    dependencies: async() => {
        const filepath = path.join(process.cwd(), 'package.json');
        // delete require.cache[require.resolve(filepath)];
        const { dependencies, devDependencies } = require(filepath);
        return {
            dependencies: dependenceTranslate(dependencies),
            devDependencies: dependenceTranslate(devDependencies)
        };
    },
    install: (name, type, socket) => {
        const ls = spawn('npm', ['install', name, `-${type}`]);
        ls.stdout.on('data', (data) => {
            socket.emit('log push', data.toString());
        });
        ls.stderr.on('data', (data) => {
            socket.emit('log push', data.toString());
        });
        return name;
    },
    uninstall: (name, socket) => {
        const ls = spawn('yarn', ['remove', name, '-DS']);
        ls.stdout.on('data', (data) => {
            socket.emit('log push', data.toString());
        });
        ls.stderr.on('data', (data) => {
            socket.emit('log push', data.toString());
        });
        return name;
    }
}
