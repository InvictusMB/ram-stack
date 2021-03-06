const _ = require('lodash/fp');

const {resolvePluginTemplate} = require('../../utils');
const renderHelpers = require('./render-helpers');

module.exports = function babelEmitterPlugin(options, context) {
  const {rootName, ruleMatches, basePath} = context;

  if (!ruleMatches.length) {
    return null;
  }
  const template = _.template(resolvePluginTemplate({
    options,
    compositionRootName: rootName,
    pluginName: `babel-emitter`,
    defaultTemplateFilename: 'registration.js.template',
    dirname: __dirname,
  }));
  return template({root: rootName, ruleMatches, basePath, ...renderHelpers});
};
