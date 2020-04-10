#!/usr/bin/env node

const program = require('commander');

program.version(require('./version')());

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
.option('-p --port <port>', 'which port to use, default 8111')
.action((options) => {
    console.log(options.port);
    console.log('screenshot called');
    require('./screenshot')(options.port);
});

program.parse(process.argv);
