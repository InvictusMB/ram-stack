const _ = require('lodash/fp');

const {loadTemplate} = require('../../utils');
const renderHelpers = require('./render-helpers');

module.exports = function babelEmitterPlugin(options, context) {
  const {rootName, ruleMatches} = context;

  if (!ruleMatches.length) {
    return null;
  }
  const template = _.template(getTemplate(options, rootName));
  return template({root: rootName, ruleMatches, ...renderHelpers});
};

function getTemplate(options, rootName) {
  const defaultTemplateFilename = 'registration.js.template';
  const {
    cwd,
    templateFilename,
    template,
  } = options;
  if (template) {
    console.log(`[babel-emitter] using the inline template for "${rootName}`);
    return template;
  }
  if (templateFilename) {
    console.log(`[babel-emitter] resolving the template for "${rootName}"`);
    return loadTemplate(cwd, 'babel-emitter', templateFilename);
  }
  console.log(`[babel-emitter] using the default template for "${rootName}`);
  return loadTemplate(__dirname, 'babel-emitter', defaultTemplateFilename);
}
