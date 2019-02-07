//@ts-ignore
const {createMacro} = require('babel-plugin-macros');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');
const dot = require('dot-object');

const config = require('./composition-config');
const {rules, compositionRoots} = parseConfig(config);

module.exports = createMacro(compositionRootMacro);

function compositionRootMacro({references, state, babel}) {
  const {file: {opts: {filename}}} = state;
  const cwd = path.dirname(filename);

  _.forEach(references, (reference, referenceName) => {
    const rule = rules[referenceName.replace('register', '')];
    if (!rule) {
      console.log(`No rule defined for ${referenceName}`);
      return reference.forEach(removeReference);
    }
    reference.forEach(referencePath => resolveReference(cwd, babel, rule, referencePath));
  });
}

function parseConfig(config) {
  const {rules, compositionRoots} = dot.object(dot.dot(config));
  return {
    rules: preprocessRules(rules),
    compositionRoots
  }
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
    _.omit(rule, 'extends')
  );
}

function resolveReference(cwd, babel, rule, referencePath) {
  const [referencesAst, rootPathAst] = referencePath.parentPath.get('arguments');
  const references = getReferences(referencesAst);
  const rootPath = rootPathAst.node.value;

  const registrations = getRegistrations(cwd, rule, references, rootPath);

  const roots = _.chain(registrations)
    .map(renderCompositionRootRegistrations)
    .filter()
    .value();

  if (roots.length) {
    const replacement = babel.template(
      roots.join('\n'),
    )();
    replaceReference(referencePath, replacement);
  } else {
    removeReference(referencePath);
  }
}

function renderCompositionRootRegistrations(registrations, root) {
  if (!registrations.length) {
    return null;
  }
  const template = _.template(compositionRoots[root].template);
  return template({root, registrations});
}

function removeReference(referencePath) {
  referencePath.parentPath.parentPath.remove();
}

function replaceReference(referencePath, replacement) {
  referencePath.parentPath.parentPath.replaceWithMultiple(replacement);
}

function getReferences(objectExpression) {
  return _.fromPairs(
    _.map(objectExpression.node.properties, property => [property.key.name, property.value.name]),
  );
}

function getRegistrations(cwd, rule, references, rootPath) {
  if (rule.compose) {
    const composed = _.map(rule.compose, ref => getRegistrations(cwd, rules[ref], references, rootPath));
    return _.mergeWith({}, ...composed, (dest, src) => {
      if (_.isArray(dest)) {
        return dest.concat(src);
      }
    });
  }

  return _.mapValues(rule.registrations,
    compositionRootRule => {
      return getCompositionRootRegistrations(
        cwd, rule.ext, compositionRootRule, references, rootPath,
      );
    },
  );
}

function getCompositionRootRegistrations(cwd, ext, compositionRootRule, references, rootPath) {
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
