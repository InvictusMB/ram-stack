const path = require('path');
const _ = require('lodash');

module.exports = {
  runPlugins,
  runGlobalPlugins,
};

function runPlugins(configAbsolutePath, compositionRoots, ruleMatches) {
  const defaultOptions = {
    cwd: path.dirname(configAbsolutePath),
  };

  _.forEach(compositionRoots, (root, rootName) => {
    const rootMatches = ruleMatches[rootName] || [];
    const plugins = _.map(root.plugins, normalizeDefinition);
    _.forEach(plugins, pluginDefinition => {
      const [name, pluginOptions] = pluginDefinition;
      const options = computeOptions(defaultOptions, pluginOptions);
      requirePlugin(name)(options, rootMatches);
    });
  });
}

function runGlobalPlugins(configAbsolutePath, compositionConfig) {
  const defaultOptions = {
    cwd: path.dirname(configAbsolutePath),
  };
  const plugins = _.map(compositionConfig.plugins, normalizeDefinition);
  _.forEach(plugins, pluginDefinition => {
    const [name, pluginOptions] = pluginDefinition;
    const options = computeOptions(defaultOptions, pluginOptions);
    requirePlugin(name)(options, compositionConfig);
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
