const http = require('http');
const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const schema = require('./schema/index');

const PORT = 4000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = new ApolloServer({
    ...schema,
    playground: { version: '1.7.25' }
});

server.applyMiddleware({app})

const httpServer = http.createServer(app);

server.installSubscriptionHandlers(httpServer);

// ⚠️ Pay attention to the fact that we are calling `listen` on the http server variable, and not on `app`.
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})