const fs = require('fs');
const path = require('path');

const {loadConfig} = require('../config-loader');
const {resolveContext} = require('../resolver');

module.exports = {build};

function build(searchRoot, referencedRule, configFile = 'composition-config.json', outputFile) {
  const searchPath = path.resolve(process.cwd(), searchRoot);
  const configAbsolutePath = path.resolve(searchPath, configFile);

  console.log('Loading config', require.resolve(configAbsolutePath));
  const compositionConfig = loadConfig(configAbsolutePath);

  const {plugins, rules, compositionRoots} = compositionConfig;

  const context = {
    referencedRule,
    cwd: searchPath,
    basePath: path.relative(process.cwd(), searchRoot),
    configAbsolutePath,
    rootPath: '.',
    plugins,
    rules,
    compositionRoots,
  };

  const output = resolveContext(context);

  if (!output) {
    console.warn(`No files matched "${referencedRule}" rule in ${searchPath}`);
  }

  if (outputFile) {
    fs.writeFileSync(path.resolve(searchPath, outputFile), output);
  }
}

