const path = require('path');
const fs = require('fs');

module.exports = {
    Query: {
        dependencies() {
            const file = path.join(process.cwd(), 'package.json');
            const packageJSON = JSON.parse(fs.readFileSync(file).toString('utf-8'));
            const dependencies = packageJSON.dependencies;
            const _dependencies = [];
            for (let key in dependencies) {
                _dependencies.push({
                    name: key,
                    version: dependencies[key]
                });
            }
            return _dependencies;
        }
    }
}