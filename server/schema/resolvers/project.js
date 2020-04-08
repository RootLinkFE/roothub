const path = require('path');
const fs = require('fs');
const GraphQLJSON = require('graphql-type-json');
const { GraphQLJSONObject } = require('graphql-type-json');

module.exports = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Query: {
        project() {
            const file = path.join(process.cwd(), 'package.json');
            const packageJSON = JSON.parse(fs.readFileSync(file).toString('utf-8'));
            return {
                type: packageJSON.magicPark.type,
                cwd: process.cwd(),
                version: packageJSON.version
            };
        }
    }
}