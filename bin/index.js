#!/usr/bin/env node

const program = require('commander');
const { version } = require('../package.json');

program.version(version, '-v, --version');

program
.command('ui')
.description('start GUI🚀')
.action(() => {
    require('./ui')();
});

program
.command('add')
.description('add a block or component')
.action(() => {
    console.log('add called');
    require('./add')();
});

program
.command('screenshot')
.alias('sh')
.description('screenshot for materials')
.option('-p --port <port>', 'which port to use, default 8222')
.action((options) => {
    console.log('screenshot called');
    require('./screenshot')(options);
});

program.parse(process.argv);
