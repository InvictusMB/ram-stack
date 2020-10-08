const fs = require('fs');
const minimist = require('minimist');

const {build} = require('./build');
const {watch} = require('./watch');

const argv = minimist(process.argv.slice(2), {
  alias: {
    c: 'config',
    o: 'output',
    h: 'help',
    v: 'version',
  },
});

if (argv.v) {
  console.log(require('../../package.json').version);
  return;
}

if (argv.h) {
  switch (argv._[0]) {
    case 'build':
      fs.createReadStream(__dirname + '/build-usage.txt').pipe(process.stdout);
      return;
    case 'watch':
      fs.createReadStream(__dirname + '/watch-usage.txt').pipe(process.stdout);
      return;
    default:
      fs.createReadStream(__dirname + '/cli-usage.txt').pipe(process.stdout);
      return;
  }
}

switch (argv._[0]) {
  case 'build':
    build(argv._[1], argv._[2], argv.c, argv.o);
    return;
  case 'watch':
    watch(argv._[1], argv._[2]);
    return;
  default:
    fs.createReadStream(__dirname + '/cli-usage.txt').pipe(process.stdout);
    return;
}
