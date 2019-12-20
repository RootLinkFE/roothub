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

program.parse(process.argv);
