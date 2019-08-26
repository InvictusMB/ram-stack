const _ = require('lodash');

const {processRule} = require('./rule-engine');
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

  const ruleOutput = processRule(rule, context);

  const roots = _.chain(ruleOutput)
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

function renderCompositionRootRegistrations(compositionRoots, rawRegistrations, root) {
  if (!rawRegistrations.length) {
    return null;
  }
  const registrations = _.map(rawRegistrations, renderRegistration);
  const template = _.template(compositionRoots[root].template);
  return template({root, registrations});
}

function removeReference(insertionNodePath) {
  insertionNodePath.remove();
}

function replaceReference(insertionNodePath, replacement) {
  insertionNodePath.replaceWithMultiple(replacement);
}
