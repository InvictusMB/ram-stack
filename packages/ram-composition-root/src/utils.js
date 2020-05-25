const fs = require('fs');
const path = require('path');

module.exports = {
  formatPath,
  loadTemplate,
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
