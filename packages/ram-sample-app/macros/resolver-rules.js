//@ts-ignore
const _ = require('lodash');
const path = require('path');

const rules = {
  'Views': {
    ext: '.view.tsx',
    getName: ({filePath, ext}) => pascalCase(filePath, ext) + 'View',
    getContainerRegistration: ({moduleName, filePath, references: r}) =>
      `${moduleName}: ${r.awilix}.asValue(${r.withContainer}(${r.container}, ${r.observer}(require('./${filePath}').${moduleName})))`,
  },
  'Components': {
    ext: '.component.tsx',
    getName: ({filePath, ext}) => pascalCase(filePath, ext),
    getContainerRegistration: ({moduleName, filePath, references: r}) =>
      `${moduleName}: ${r.awilix}.asValue(${r.withContainer}(${r.container}, require('./${filePath}').${moduleName}))`,
  },
  'Pages': {
    ext: '.page.tsx',
    getName: ({filePath, ext}) => pascalCase(filePath, ext) + 'Page',
    getContainerRegistration: ({moduleName, filePath, references: r}) =>
      `${moduleName}: ${r.awilix}.asValue(${r.withContainer}(${r.container}, ${r.observer}(require('./${filePath}').${moduleName})))`,
  },
  'Stores': {
    ext: '.store.ts',
    getName: ({filePath, ext}) => pascalCase(filePath, ext) + 'Store',
    getContainerRegistration: ({moduleName, filePath, references: r}) =>
      `${_.lowerFirst(moduleName)}: ${r.awilix}.asClass(require('./${filePath}').${moduleName}).singleton()`,
  },
  'Module': {
    ref: ['Views', 'Components', 'Stores', 'Pages']
  }
};

function pascalCase(filePath, ext) {
  return _.upperFirst(_.camelCase(path.basename(filePath, ext)))
}

module.exports = rules;
