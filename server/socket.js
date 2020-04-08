const socket = require('socket.io');
const dependenceService = require('./services/dependence');

exports.io = function (server) {
    const io = socket(server);
    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('install dependence', function (data) {
            dependenceService.install(data.name, data.type, socket);
        });
        socket.on('uninstall dependence', function (name) {
            dependenceService.uninstall(name, socket);
        });
    });
}

    