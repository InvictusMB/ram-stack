const path = require('path');
const _ = require('lodash');

const {processRule} = require('./rule-engine');
const {processNamingRules} = require('./naming-rules');
const {runPlugins} = require('./plugin-runner');
const renderHelpers = require('./render-helpers');
const {loadTemplate} = require('./utils');

module.exports = {
  resolveContext
};

function resolveContext(context) {
  const {
    referencedRule,
    babel,
    configAbsolutePath,
    insertionNodePath,
    rules,
    compositionRoots,
    filename
  } = context;

  const rule = rules[referencedRule];
  if (!rule) {
    console.warn(`No rule defined for register${referencedRule} macro in ${configAbsolutePath}`);
    return removeReference(insertionNodePath);
  }

  const ruleMatches = processRule(rule, context);

  const roots = _.chain(ruleMatches)
    .mapValues(matches => _.map(matches, processNamingRules))
    .tap(_.partial(runPlugins, configAbsolutePath, compositionRoots))
    .map(_.partial(renderCompositionRootRegistrations, configAbsolutePath, compositionRoots))
    .filter()
    .value();

  if (!roots.length) {
    console.warn(`No files matched register${referencedRule} macro in ${filename}`);
    removeReference(insertionNodePath);
  } else {
    const replacement = babel.template(
      roots.join('\n'),
    )();
    replaceReference(insertionNodePath, replacement);
  }
}

function renderCompositionRootRegistrations(configAbsolutePath, compositionRoots, ruleMatches, root) {
  if (!ruleMatches.length) {
    return null;
  }
  const template = _.template(getTemplate(configAbsolutePath, compositionRoots[root]));
  return template({root, ruleMatches, ...renderHelpers});
}

function removeReference(insertionNodePath) {
  insertionNodePath.remove();
}

function replaceReference(insertionNodePath, replacement) {
  insertionNodePath.replaceWithMultiple(replacement);
}

function getTemplate(configAbsolutePath, compositionRoot) {
  const {templateFilename} = compositionRoot;
  if (templateFilename) {
    const cwd = path.dirname(configAbsolutePath);
    return loadTemplate(cwd, 'composition-root-macro', templateFilename);
  }
  if (!compositionRoot.template) {
    console.log(`[composition-root-macro] using the default template`);
    return loadTemplate(__dirname, 'composition-root-macro', 'registration-template.ejs');
  }
  return compositionRoot.template;
}
