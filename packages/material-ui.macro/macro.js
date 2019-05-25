const {createReplacerMacro} = require('@ram-stack/import-replacer-helper');
const {name: packageName} = require('./package');

module.exports = createReplacerMacro({
  getPath: name => `@material-ui/core/${name}`,
  defaultNamespaceImport: `import MUI from '${packageName}'`,
});
