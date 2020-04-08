const path = require('path');
const fs = require('fs');
const spawn = require('cross-spawn');
const { PubSub } = require('graphql-subscriptions')

const pubsub = new PubSub();
const LOG_DATA = 'LOG_DATA';

function dependenceTranslate (dependencies) {
    let arr = [];
    for (let key in dependencies) {
        arr.push({
            name: key,
            version: dependencies[key]
        });
    }
    return arr;
}

function fn() {
    console.log('i am father process');
}

module.exports = {
    Subscription: {
        logData: {
            subscribe: () => {
                return pubsub.asyncIterator([LOG_DATA]);
            }
        }
    },
    Query: {
        dependence() {
            const file = path.join(process.cwd(), 'package.json');
            const packageJSON = JSON.parse(fs.readFileSync(file).toString('utf-8'));
            const _dependencies = packageJSON.dependencies;
            const _devDependencies = packageJSON.devDependencies;
            return {
                dependencies: dependenceTranslate(_dependencies),
                devDependencies: dependenceTranslate(_devDependencies)
            };
        }
    },
    Mutation: {
        installDependence(root, {name, type}) {
            const ls = spawn('yarn', ['add', name, `-${type}`]);
            //const ls = spawn('ls', ['-a']);
            ls.stdout.on('data', (data) => {
                pubsub.publish(LOG_DATA, {logData: data.toString()});
                fn();
                console.log(`stdout: ${data}`);
            })
            ls.stderr.on('data', (data) => {
                pubsub.publish(LOG_DATA, {logData: data.toString()});
            });
            ls.on('close', (code) => {
                console.log(`子进程退出，使用退出码 ${code}`);
            });
            return name;
        }
    }
}