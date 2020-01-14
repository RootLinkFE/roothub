const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');

function isRequired(value) {
    return !!value;
}

// 拷贝时过滤node_modules目录
function filterFunc (path) {
    if (fs.lstatSync(path).isDirectory() && path.indexOf('node_modules') > -1) {
        return false;
    }
    return true;
}

module.exports = () => {
    inquirer
    .prompt([{
        type: 'list',
        name: 'framework',
        message: 'Please select framework',
        choices: [
            'vue',
            'react'
        ]
    },
    {
        type: 'list',
        name: 'type',
        message: 'Please select material type',
        choices: [
            'block',
            'component'
        ]
    }, 
    {
        type: 'list',
        name: 'client',
        message: 'Please select client type',
        choices: [
            'pc',
            'mobile'
        ]
    },
    {
        type: 'input',
        name: 'name',
        message: (answers) => {
            let m = '';
            switch (answers.type) {
                case 'block':
                    m = 'block name (ExampleBlock)';
                    break;
                case 'component':
                    m = 'component name (ExampleComponent)';
            }
            return m;
        },
        validate: (input, answers) => {
            if (input) {
                try {
                    const file = path.join(process.cwd(), `${answers.type}s/${input}`);
                    fs.accessSync(file, fs.constants.F_OK);
                    console.error(chalk.red(`\n${input} is already exist`));
                    return false;
                } catch {
                    return true;
                }
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'description',
        validate: isRequired
    }])
    .then(answers => {
        console.log(JSON.stringify(answers, null, ' '));
        const { framework, type, name } = answers;
        const src = path.join(__dirname, '..', `material-tpl/${framework}/${type}`);
        const dest = path.join(process.cwd(), `${type}s/${name}`);
        fs.copy(src, dest, {
            filter: filterFunc
        }).then(() => {
            const file = path.join(process.cwd(), `${type}s.json`);
            // 写入数据到对应的json文件
            fs.readFile(file, (err, data) => {
                if (err) {
                    return console.error(chalk.red(err));
                }
                data = JSON.parse(data);
                data.push(answers);
                let str = JSON.stringify(data, null , '    ');
                fs.writeFile(file, str, (err) => {
                    if (err) {
                        return console.error(chalk.red(err));
                    }
                    console.log(chalk.green(`${name} add success!`));
                })
            });
        }).catch(err => console.error(err))
    })
};