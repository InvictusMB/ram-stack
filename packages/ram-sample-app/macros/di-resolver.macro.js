//@ts-ignore
const {createMacro} = require('babel-plugin-macros');
const path = require('path');
const glob = require('glob');
const _ = require('lodash');

const rules = require('./resolver-rules');

module.exports = createMacro(diResolverMacro);

function diResolverMacro({references, state, babel}) {
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

function removeReference(referencePath) {
  referencePath.parentPath.parentPath.remove();
}

function resolveReference(cwd, babel, rule, referencePath) {
  const [container, root] = referencePath.parentPath.get('arguments');
  const containerName = container.node.name;
  const rootPath = root.node.value;
  console.log('container:', containerName);
  console.log('root:', rootPath);

  const registrations = getRegistrations(cwd, rule, rootPath);
  if (registrations.length) {
    const replacement = babel.template(
      containerRegistationTemplate({containerName, registrations}),
    )();
    referencePath.parentPath.parentPath.replaceWithMultiple(replacement);
  } else {
    referencePath.parentPath.parentPath.remove();
  }
}

const containerRegistationTemplate = ({containerName, registrations}) => `
${containerName}.register({
  ${registrations.join(',\n')}
});
`;

function getRegistrations(cwd, rule, rootPath) {
  if (rule.ref) {
    return _.flatMap(rule.ref, ref => getRegistrations(cwd, rules[ref], rootPath))
  }

  const {ext} = rule;
  const modules = glob.sync(path.join(cwd, rootPath, '**/*' + ext));
  return modules
    .map(filePath => path.relative(cwd, filePath))
    .map(filePath => filePath.replace(/\\/g, '/'))
    .map(filePath => {
      const moduleName = rule.getName({filePath, ext});
      return rule.getContainerRegistration({moduleName, filePath});
    });
}
