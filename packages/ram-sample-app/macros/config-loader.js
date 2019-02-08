//@ts-ignore
const _ = require('lodash');
const dot = require('dot-object');

module.exports = {
  loadConfig,
};

function loadConfig(configPath) {
  return parseConfig(require(configPath));
}

function parseConfig(config) {
  const {rules, compositionRoots} = dot.object(dot.dot(config));
  return {
    rules: preprocessRules(rules),
    compositionRoots,
  };
}

function preprocessRules(rules) {
  return _.chain(rules)
    .pickBy(rule => !rule.isAbstract)
    .mapValues(rule => {
      while (rule.extends) {
        rule = extendRule(rule, rules[rule.extends]);
      }
      return rule;
    })
    .value();
}

function extendRule(rule, parent) {
  return _.merge({},
    _.omit(parent, 'isAbstract'),
    _.omit(rule, 'extends'),
  );
}
