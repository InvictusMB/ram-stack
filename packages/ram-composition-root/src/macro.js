const _ = require('lodash');
const path = require('path');
const {createMacro} = require('babel-plugin-macros');

const {loadConfig} = require('./config-loader');
const {resolveContext} = require('./resolver');

module.exports = createMacro(macro);

function macro({references, state, babel}) {
  const {file: {opts: {filename}}} = state;
  const cwd = path.dirname(filename);
  const basePath = path.relative(process.cwd(), cwd);

  _.forEach(references, (reference, referenceName) => {
    const referencedRule = referenceName.replace('register', '');
    reference
      .map(parseMacroParameters)
      .map(({referencePath, configPath, rootPath}) => {
        const configAbsolutePath = path.resolve(cwd, configPath);
        const compositionConfig = loadConfig(configAbsolutePath);
        const {plugins, rules, compositionRoots} = compositionConfig;
        return {
          filename,
          referencedRule,
          cwd,
          basePath,
          configAbsolutePath,
          rootPath,
          plugins,
          rules,
          compositionRoots,
          babel,
          insertionNodePath: getInsertionPath(referencePath),
        }
      })
      .forEach(resolveContext);
  });
}

function parseMacroParameters(referencePath) {
  const [referencesAst, rootPathAst, configPathAst] = referencePath.parentPath.get('arguments');
  // TODO: Validate passed references
  const references = getReferences(referencesAst);
  const configPath = configPathAst ? configPathAst.node.value : './composition-config.json';
  const rootPath = rootPathAst.node.value;
  return {
    referencePath,
    references,
    configPath,
    rootPath
  }
}

function getInsertionPath(referencePath) {
  return referencePath.parentPath.parentPath;
}

function getReferences(objectExpression) {
  return _.fromPairs(
    _.map(objectExpression.node.properties, property => [property.key.name, property.value.name]),
  );
}
