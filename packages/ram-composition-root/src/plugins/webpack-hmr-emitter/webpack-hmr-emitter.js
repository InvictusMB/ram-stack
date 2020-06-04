const _ = require('lodash/fp');

const {resolvePluginTemplate} = require('../../utils');
const renderHelpers = require('../babel-emitter/render-helpers');

module.exports = function hmrEmitterPlugin(options, context) {
  const {rootName, ruleMatches, basePath} = context;

  if (!ruleMatches.length) {
    return null;
  }
  const template = _.template(resolvePluginTemplate({
    options,
    compositionRootName: rootName,
    pluginName: 'webpack-hmr-emitter',
    defaultTemplateFilename: 'hmr.js.template',
    dirname: __dirname,
  }));
  return template({root: rootName, ruleMatches, basePath, ...renderHelpers});
};
