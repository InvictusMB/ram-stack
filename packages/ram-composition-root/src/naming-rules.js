const _ = require('lodash');
const path = require('path');

module.exports = {
  processNamingRules
};

function processNamingRules(context) {
  const {rule, filePath, ext} = context;
  const {naming} = rule;
  return _.extend({}, context, getNames(naming, filePath, ext));
}

function getNames(namingRules, filePath, ext) {
  return _.chain(namingRules)
    .defaults({
      identifier: {},
      registration: {}
    })
    .mapValues(rule => applyNamingRule(rule, filePath, ext))
    .value();
}

function applyNamingRule(namingRule = {}, filePath, ext) {
  const casingFunctions = {
    pascal: id => _.upperFirst(_.camelCase(id)),
    camel: _.camelCase,
    snake: _.snakeCase,
  };
  const {casing = 'pascal', prefix, suffix} = namingRule;
  const id = path.basename(filePath, ext);
  return [prefix, casingFunctions[casing](id), suffix].join('');
}
