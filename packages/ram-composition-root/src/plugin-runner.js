const path = require('path');
const _ = require('lodash');

module.exports = {
  runCompositionRootPlugins,
  runGlobalPlugins,
};

function runCompositionRootPlugins(context) {
  const {compositionRoots, ruleMatches} = context;

  return _.flatMap(compositionRoots, (rootDefinition, rootName) => {
    const rootMatches = ruleMatches[rootName] || [];

    const pluginContext = Object.create(context);
    Object.assign(pluginContext, {
      rootName,
      rootDefinition,
      ruleMatches: rootMatches,
    });

    const {plugins} = rootDefinition;
    return runPlugins(pluginContext, plugins);
  });
}

function runGlobalPlugins(context) {
  const {plugins} = context;
  return runPlugins(context, plugins);
}

function runPlugins(context, plugins) {
  const {configAbsolutePath} = context;
  const defaultOptions = {
    cwd: path.dirname(configAbsolutePath),
  };
  const normalizedPlugins = _.map(plugins, normalizeDefinition);
  return _.map(normalizedPlugins, pluginDefinition => {
    const [name, pluginOptions] = pluginDefinition;
    const options = computeOptions(defaultOptions, pluginOptions);
    return requirePlugin(name)(options, context);
  });
}

function normalizeDefinition(pluginDefinition) {
  if (_.isString(pluginDefinition)) {
    return [pluginDefinition, {}];
  }
  if (_.isArray(pluginDefinition)) {
    return pluginDefinition;
  }
  console.warn('[composition-root/macro] Expected plugin definition to be "pluginName" or ["pluginName", config]');
  console.dir(pluginDefinition);
  throw new Error('[composition-root/macro] Failed to load a plugin definition');
}

function computeOptions(defaultOptions, pluginOptions) {
  return _.extend({}, _.cloneDeep(defaultOptions), _.cloneDeep(pluginOptions));
}

function requirePlugin(name) {
  return require('./plugins/' + _.kebabCase(name));
}
