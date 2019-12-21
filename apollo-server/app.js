const bodyParser = require('body-parser');
const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const router = require('./router');

const PORT = 4000;
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

io.on('connection', function (socket) {
    console.log('socket connected');
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
});

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
server.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}`)
})