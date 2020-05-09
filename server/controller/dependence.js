const path = require('path');
const fs = require('fs-extra');

function dependenceTranslate(dependencies) {
    let arr = [];
    for (let key in dependencies) {
        arr.push({
            name: key,
            version: dependencies[key]
        });
    }
    return arr;
}

module.exports = {
    dependencies: async (req, res, next) => {
        try { 
            const filepath = path.join(req.workingDirectory, 'package.json');
            const { dependencies, devDependencies } = await fs.readJson(filepath);
            console.log(dependencies);
            const result = {
                dependencies: dependenceTranslate(dependencies),
                devDependencies: dependenceTranslate(devDependencies)
            };
            res.status(200).send({
                success: true,
                data: result
            });
        } catch (err) {
            next(err);
        }
    }
}
