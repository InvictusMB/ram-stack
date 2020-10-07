const _ = require('lodash/fp');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const {loadConfig} = require('../config-loader');
const {resolveContext} = require('../resolver');

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

if (argv.h || !argv._[0]) {
  fs.createReadStream(__dirname + '/usage.txt').pipe(process.stdout);
  return;
}

const searchRoot = argv._[1];
const referencedRule = argv._[2];

const searchPath = path.resolve(process.cwd(), searchRoot);
const configFile = argv.c || 'composition-config.json';
const configAbsolutePath = path.resolve(searchPath, configFile);

console.log('Loading config', require.resolve(configAbsolutePath));
const compositionConfig = loadConfig(configAbsolutePath);


const {plugins, rules, compositionRoots} = compositionConfig;

const context = {
  referencedRule,
  cwd: searchPath,
  basePath:  path.relative(process.cwd(), searchRoot),
  configAbsolutePath,
  rootPath: '.',
  plugins,
  rules,
  compositionRoots,
}

const output = resolveContext(context);

if (!output) {
  console.warn(`No files matched "${referencedRule}" rule in ${searchPath}`);
}

let outputFile = argv.o;
if (outputFile) {
  fs.writeFileSync(path.resolve(searchPath, outputFile), output);
}
