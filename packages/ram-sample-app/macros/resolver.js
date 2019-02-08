//@ts-ignore
const _ = require('lodash');

const {processRule} = require('./rule-engine');

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

  const registrations = processRule(rule, context);

  const roots = _.chain(registrations)
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

function renderCompositionRootRegistrations(compositionRoots, registrations, root) {
  if (!registrations.length) {
    return null;
  }
  const template = _.template(compositionRoots[root].template);
  return template({root, registrations});
}

function removeReference(insertionNodePath) {
  insertionNodePath.remove();
}

function replaceReference(insertionNodePath, replacement) {
  insertionNodePath.replaceWithMultiple(replacement);
}
