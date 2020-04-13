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
.option('-t --type <type>', 'set the type of screenshot, eg: pc, mobile')
.action((options) => {
    console.log('screenshot called');
    require('./screenshot')(options.port, options.type);
});

program.parse(process.argv);
