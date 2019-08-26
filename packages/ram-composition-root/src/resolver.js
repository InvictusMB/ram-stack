const _ = require('lodash');

const {processRule} = require('./rule-engine');
const {processNamingRules} = require('./naming-rules');
const {renderRegistration} = require('./render-registration');

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
    .map(_.partial(renderCompositionRootRegistrations, compositionRoots))
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

function renderCompositionRootRegistrations(compositionRoots, ruleMatches, root) {
  if (!ruleMatches.length) {
    return null;
  }
  const registrations = _.map(ruleMatches, renderRegistration);
  const template = _.template(compositionRoots[root].template);
  return template({root, registrations});
}

function removeReference(insertionNodePath) {
  insertionNodePath.remove();
}

function replaceReference(insertionNodePath, replacement) {
  insertionNodePath.replaceWithMultiple(replacement);
}
