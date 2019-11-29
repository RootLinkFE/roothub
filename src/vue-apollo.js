import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import VueApollo from 'vue-apollo';
import { getMainDefinition } from 'apollo-utilities'

Vue.use(VueApollo);

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true
    }
});

// 使用分割连接的功能
// 你可以根据发送的操作类型将数据发送到不同的连接
const link = split(
    // 根据操作类型分割
    ({ query }) => {
      const definition = getMainDefinition(query)
      return definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
    },
    wsLink,
    httpLink
);

const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

const apolloProvider = new VueApollo({
    defaultClient: apolloClient
});

export default apolloProvider;