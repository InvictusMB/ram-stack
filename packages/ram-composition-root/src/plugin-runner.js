const path = require('path');
const _ = require('lodash');

module.exports = {
  runPlugins,
};

function runPlugins(configAbsolutePath, compositionRoots, ruleMatches) {
  const defaultOptions = {
    cwd: path.dirname(configAbsolutePath),
  };

  _.forEach(compositionRoots, (root, rootName) => {
    const rootMatches = ruleMatches[rootName] || [];
    _.forEach(root.plugins, pluginDefinition => {
      if (_.isString(pluginDefinition)) {
        requirePlugin(pluginDefinition)(_.cloneDeep(defaultOptions), rootMatches);
      } else {
        const [name, pluginOptions] = pluginDefinition;
        const options = _.extend({}, _.cloneDeep(defaultOptions), _.cloneDeep(pluginOptions));
        requirePlugin(name)(options, rootMatches);
      }
    });
  });

  function requirePlugin(name) {
    return require('./plugins/' + _.kebabCase(name));
  }
}
