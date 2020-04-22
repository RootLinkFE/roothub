const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const Git = require('nodegit');

var gitPath = '';

const repoPath = path.join(process.cwd(), '.git');
Git.Repository.open(repoPath).then(function (repo) {
    // Inside of this function we have an open repo
    repo.config().then(config => {
        config.getStringBuf("remote.origin.url").then(buf => {
            gitPath = buf.toString().replace('git@', 'https://')
            .replace('.git', '').replace('.com:', '.com/');
        })
    });
}).catch((err) => {
    console.err(err);
});

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
        message: '选择开发模板',
        choices: [
            'vue',
            'muji'
        ]
    },
    {
        type: 'list',
        name: 'type',
        message: '选择物料类型',
        choices: [
            'block',
            'component'
        ]
    }, 
    {
        type: 'input',
        name: 'tags',
        message: '物料标签，逗号分割',
        validate: isRequired
    },
    {
        type: 'input',
        name: 'name',
        message: '物料名称',
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
        message: '物料描述',
        validate: isRequired
    }])
    .then(async (answers) => {
        try {
            const { framework, type, name } = answers;
            answers.sourceCode = `${gitPath}/tree/master/${type}s/${name}`;  // 源码位置
            answers.downloadPath = `/${type}s/${name}`; // 区块下载路径
            console.log(chalk.green(JSON.stringify(answers, null, ' ')));
            const src = path.join(__dirname, '..', `material-tpl/${framework}/${type}`); // 物料开发模板
            const dest = path.join(process.cwd(), `${type}s/${name}`);
            const materialsJsonPath = path.join(process.cwd(), `materials.json`);
            await fs.copy(src, dest, {
                filter: filterFunc
            });
            // 写入数据到json中
            let data = await fs.readJson(materialsJsonPath);
            data.list[`${type}s`].push(answers);
            let str = JSON.stringify(data, null , '\t');
            await fs.writeFile(materialsJsonPath, str);
            console.log(chalk.green(`${name} add success!`));
        } catch(err) {
            console.error(err);
        }
    })
};
