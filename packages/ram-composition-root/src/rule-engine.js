const _ = require('lodash');
const glob = require('glob');
const path = require('path');

module.exports = {
  processRule
};

function processRule(rule, context) {
  const {rules, cwd, rootPath} = context;
  if (rule.compose) {
    const composed = _.map(rule.compose, ref => {
      const composedRule = rules[ref];
      if (!composedRule) {
        throw new Error(`Definition for rule ${ref} not found`);
      }
      return processRule(composedRule, context);
    });
    return _.mergeWith({}, ...composed, (dest, src) => {
      if (_.isArray(dest)) {
        return dest.concat(src);
      }
    });
  }

  return _.mapValues(rule.registrations,
    compositionRootRule => {
      return getCompositionRootRegistrations(
        cwd, rule.ext, compositionRootRule, rootPath,
      );
    },
  );
}

function getCompositionRootRegistrations(cwd, ext, compositionRootRule, rootPath) {
  const {
    naming,
    decorators = [],
    modifiers = [],
  } = compositionRootRule;

  const modules = glob.sync(path.join(cwd, rootPath, '**/*' + ext));
  return modules
    .map(filePath => path.relative(cwd, filePath))
    .map(filePath => filePath.replace(/\\/g, '/'))
    .map(filePath => {
      const {identifier, registration} = getNames(naming, filePath, ext);
      let expression = `require('./${filePath}').${identifier}`;
      expression = _.reduce(decorators,
        (acc, decorator) => applyDecorator(decorator, acc), expression,
      );
      expression = _.reduce(modifiers,
        (acc, modifier) => applyModifier(modifier, acc), expression,
      );

      return `${registration}: ${expression}`;
    });
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

function applyDecorator(decorator, expr) {
  return `${decorator}(${expr})`;
}

function applyModifier(modifier, expr) {
  return `${expr}.${modifier}()`;
}
