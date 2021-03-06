const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const os = require('os');

const {formatPath, loadTemplate} = require('../../utils');

module.exports = function tsMacroDefinitionPlugin(options, context) {
  const defaultTemplate = 'definition.ts.template';
  const defaultOutputFilename = 'composition-root.d.ts';
  const {
    cwd,
    templateFilename,
    outputFilename = defaultOutputFilename,
  } = options;

  const rules = _.flow([
    _.partial(mapRegularRules, context),
    _.partial(mapComposedRules, context),
  ])({});

  const templateFile = getTemplate(cwd, defaultTemplate, templateFilename);
  const eol = getEol(templateFile);

  const header = [
    '/* This file was automatically generated by ts-macro-definition plugin */',
    `/* See composition-config in ${formatPath(cwd)}/ */`,
    '\n',
  ].join('\n');

  const output = header + _.template(templateFile)({
    rules: Object.values(rules),
    cwd: formatPath(cwd),
  });

  const outputPath = path.join(cwd, outputFilename);
  fs.writeFileSync(outputPath, normalizeEol(output, eol), 'utf-8');
  console.log(`[ts-macro-definition] writing the output: ${formatPath(outputPath)}`);
};

function mapRegularRules(context, processedRules) {
  const roots = Object.keys(context.compositionRoots);

  return Object.entries(context.rules).reduce((rules, [name, rule]) => {
    rules[name] = {
      name,
      roots: [],
      decorate: [],
    };
    _.forEach(roots, root => {
      const registration = rule.registrations && rule.registrations[root];
      if (!registration) {
        return;
      }
      rules[name].roots.push(root);
      rules[name].decorate = registration.decorate || [];
    });
    return rules;
  }, processedRules);
}

function mapComposedRules(context, processedRules) {
  return Object.entries(context.rules).reduce((rules, [name, rule]) => {
    if (!rule.compose) {
      return rules;
    }
    _.forEach(rule.compose, composed => {
      rules[name].roots = _.union(rules[name].roots, rules[composed].roots);
      rules[name].decorate = _.union(rules[name].decorate, rules[composed].decorate);
    });
    return rules;
  }, processedRules);
}

function getTemplate(cwd, defaultTemplate, templateFilename) {
  if (!templateFilename) {
    console.log(`[ts-macro-definition] using the default template`);
    return loadTemplate(__dirname, 'ts-macro-definition', defaultTemplate);
  }
  return loadTemplate(cwd, 'ts-macro-definition', templateFilename);
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
