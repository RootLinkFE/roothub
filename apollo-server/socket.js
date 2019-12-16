const socket = require('socket.io');
const dependenceService = require('./services/dependence');

module.exports = {
    io: function (server) {
        const io = socket(server);
        io.on('connection', function (socket) {
            console.log('socket connected');
            socket.emit('news', { hello: 'world' });
            socket.on('install dependence', function (data) {
                console.log(data);
                dependenceService.install(data.name, data.type, socket);
            });
        });
    }
}
    