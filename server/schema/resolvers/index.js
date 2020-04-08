const path = require('path');
const { fileLoader, mergeResolvers } = require('merge-graphql-schemas');

const resolversArray = fileLoader(path.join(__dirname, './!(*.spec).js'))
module.exports = mergeResolvers(resolversArray);