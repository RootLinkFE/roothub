const path = require('path');
const fs = require('fs');
const GraphQLJSON = require('graphql-type-json');
const { GraphQLJSONObject } = require('graphql-type-json');

module.exports = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Query: {
        getFileList () {
          return [
            {
              id: 1,
              name: 'vue2',
              path: '/user/berlin/www/personal/study/vue/',
              favorite: false
             },
             {
              id: 2,
              name: 'vue3',
              path: '/user/berlin/www/personal/study/vue/vues3',
              favorite: true
             },
          ]
        }
    },
    Mutation: {
      addFile () {
        
      }
    }
}