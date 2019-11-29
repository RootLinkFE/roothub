// const { makeAugmentedSchema } = require('neo4j-graphql-js');
const typeDefs = require('./types');
const resolvers = require('./resolvers');

module.exports = {
    typeDefs,
    resolvers
};