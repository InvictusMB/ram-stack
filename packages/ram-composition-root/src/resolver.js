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
    configAbsolutePath,
    rules,
    macroName,
  } = context;

  const globalOutput = runGlobalPlugins(context);

  const rule = rules[referencedRule];
  if (!rule) {
    console.warn(`No rule defined for "${macroName}" macro in ${configAbsolutePath}`);
    return '';
  }

  const ruleMatches = getRuleMatches(context, rule);

  const contextWithMatches = Object.create(context);
  Object.assign(contextWithMatches, {ruleMatches});

  const output = _.concat(
    globalOutput,
    runCompositionRootPlugins(contextWithMatches),
  ).filter(Boolean);

  if (!output.length) {
    return '';
  } else {
    return output.join('\n');
  }
}

function getRuleMatches(context, rule) {
  return _.flow([
    processRule,
    _.mapValues(_.map(processNamingRules)),
  ])(context, rule);
}
