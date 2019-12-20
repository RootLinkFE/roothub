const inquirer = require('inquirer');
const path = require('path');

module.exports = () => {
    inquirer
    .prompt([{
        type: 'list',
        name: 'framework',
        message: 'Please select framework',
        choices: [
            'Vue',
            'React'
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
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'description'
    }])
    .then(answers => {
        console.log(JSON.stringify(answers, null, ' '));
    })
};