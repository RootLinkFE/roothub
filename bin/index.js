const minimist = require('minimist');

module.exports = () => {
    const args = minimist(process.argv.slice(2));
    let cmd = args._[0] || 'help';

    if (args.version || args.v) {
        cmd = 'version'
    }

    if (args.help || args.h) {
        cmd = 'help'
    }

    switch(cmd) {
        case 'ui':
            require('./ui')(args)
            break
        case 'version':
            require('./version')(args)
            break
        default:
            console.error(`"${cmd}" is not a valid command`)
            process.exit(1)
            break;
    }
}
