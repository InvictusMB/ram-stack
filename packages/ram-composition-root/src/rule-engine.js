const _ = require('lodash');
const glob = require('glob');
const path = require('path');

module.exports = {
  processRule
};

function processRule(context, rule) {
  const {rules, cwd, rootPath} = context;
  if (rule.compose) {
    const composed = _.map(rule.compose, ref => {
      const composedRule = rules[ref];
      if (!composedRule) {
        throw new Error(`Definition for rule ${ref} not found`);
      }
      return processRule(context, composedRule);
    });
    return _.mergeWith({}, ...composed, (dest, src) => {
      if (_.isArray(dest)) {
        return dest.concat(src);
      }
    });
  }

  return _.mapValues(rule.registrations,
    compositionRootRule => {
      return getRuleMatches(
        cwd, rule.ext, compositionRootRule, rootPath,
      )
    },
  );
}

function getRuleMatches(cwd, ext, compositionRootRule, rootPath) {
  const modules = glob.sync(path.join(cwd, rootPath, '**/*' + ext));
  return modules
    .map(filePath => path.relative(cwd, filePath))
    .map(filePath => filePath.replace(/\\/g, '/'))
    .map(filePath => {
      return {
        ext,
        filePath,
        rule: compositionRootRule,
      };
    });
}
