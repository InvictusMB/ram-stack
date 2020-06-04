const _ = require('lodash/fp');

const {processRule} = require('./rule-engine');
const {processNamingRules} = require('./naming-rules');
const {
  runGlobalPlugins,
  runCompositionRootPlugins,
} = require('./plugin-runner');

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
    filename
  } = context;

  const globalOutput = runGlobalPlugins(context);

  const rule = rules[referencedRule];
  if (!rule) {
    console.warn(`No rule defined for register${referencedRule} macro in ${configAbsolutePath}`);
    return removeReference(insertionNodePath);
  }

  const ruleMatches = getRuleMatches(context, rule);

  const contextWithMatches = Object.create(context);
  Object.assign(contextWithMatches, {ruleMatches});

  const output = _.concat(
    globalOutput,
    runCompositionRootPlugins(contextWithMatches),
  ).filter(Boolean);

  if (!output.length) {
    console.warn(`No files matched register${referencedRule} macro in ${filename}`);
    removeReference(insertionNodePath);
  } else {
    const replacement = babel.template(
      output.join('\n'),
    )();
    replaceReference(insertionNodePath, replacement);
  }
}

function getRuleMatches(context, rule) {
  return _.flow([
    processRule,
    _.mapValues(_.map(processNamingRules)),
  ])(context, rule);
}

function removeReference(insertionNodePath) {
  insertionNodePath.remove();
}

function replaceReference(insertionNodePath, replacement) {
  insertionNodePath.replaceWithMultiple(replacement);
}
