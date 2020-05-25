const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const os = require('os');

const {formatPath, loadTemplate} = require('../../utils')

module.exports = function templateEmitterPlugin(options, ruleMatches) {
  const {
    cwd,
    configPath,
    placeholders,
    templateFilename,
    outputFilename,
  } = options;

  const templateFile = loadTemplate(cwd, 'template-emitter', templateFilename);
  const eol = getEol(templateFile);

  const orderedMatches = _.sortBy(ruleMatches, ['registration']);

  const renderedMatches = _.chain(placeholders)
    .keyBy()
    .mapValues(placeholder =>
      renderMatchTemplates('rule.' + configPath + '.template.' + placeholder, orderedMatches),
    )
    .value();

  const header = [
    '/* This file was automatically generated by template-emitter plugin */',
    `/* See composition-config in ${formatPath(cwd)}/ */`,
    '\n',
  ].join('\n');

  const output = header + _.template(templateFile)(renderedMatches);

  const outputPath = path.join(cwd, outputFilename);
  fs.writeFileSync(outputPath, normalizeEol(output, eol), 'utf-8');
  console.log(`[template-emitter] writing output: ${formatPath(outputPath)}`);
};

function renderMatchTemplates(templatePath, ruleMatches) {
  return _.filter(ruleMatches, match => !!_.get(match, templatePath))
    .map(match => {
      const {ext, filePath} = match;
      const template = _.template(_.get(match, templatePath));
      return template(_.extend({}, match, {
        filePath: stripExtension(ext, filePath),
      }));
    });
}

function stripExtension(ext, filePath) {
  const extWithoutSuffix = '.' + ext.split('.').reverse()[0];
  return filePath.replace(new RegExp(extWithoutSuffix + '$'), '');
}

function getEol(text) {
  const matches = text.match(/\r\n|\n/g) || [];
  const unix = matches.filter(a => a === '\n').length;
  const win = matches.length - unix;
  if (unix === win) {
    return os.EOL;
  }
  return unix > win ? '\n' : '\r\n';
}

function normalizeEol(text, eol) {
  return text.replace(/\r\n|\n/g, eol);
}
