const {createReplacerMacro} = require('@ram-stack/import-replacer-helper');
const {name: packageName} = require('./package');

module.exports = createReplacerMacro({
  getPath: name => `@material-ui/icons/${name}`,
  defaultNamespaceImport: `import MuiIcons from '${packageName}'`,
});
