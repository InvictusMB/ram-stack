const fs = require('fs');
const path = require('path');

module.exports = {
  formatPath,
  loadTemplate,
  resolvePluginTemplate,
};

function formatPath(filePath) {
  const separatorRe = new RegExp('\\' + path.sep, 'g');
  const relative = path.relative(process.cwd(), filePath);
  const normalized = path.normalize(relative).replace(separatorRe, '/');
  if (normalized.startsWith('..')) {
    return normalized;
  }
  return './' + normalized;
}

function loadTemplate(cwd, invoker, templateFilename) {
  const inputPath = path.join(cwd, templateFilename);
  console.log(`[${invoker}] reading the template: ${formatPath(inputPath)}`);
  return fs.readFileSync(inputPath, 'utf-8');
}

function resolvePluginTemplate(config) {
  const {
    options,
    compositionRootName: rootName,
    pluginName,
    defaultTemplateFilename,
    dirname,
  } = config;
  const {
    cwd,
    templateFilename,
    template,
  } = options;
  if (template) {
    console.log(`[${pluginName}] using the inline template for "${rootName}"`);
    return template;
  }
  if (templateFilename) {
    console.log(`[${pluginName}] resolving the template for "${rootName}"`);
    return loadTemplate(cwd, pluginName, templateFilename);
  }
  console.log(`[${pluginName}] using the default template for "${rootName}"`);
  return loadTemplate(dirname, pluginName, defaultTemplateFilename);
}
