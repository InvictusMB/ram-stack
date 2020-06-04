const _ = require('lodash');

module.exports = {
  applyDecorator,
  applyChain,
  applyModifiers,
};

function applyModifiers(rule, expression) {
  const {
    decorate = [],
    chain = [],
  } = rule;
  expression = _.reduce(decorate,
    (acc, decorator) => applyDecorator(decorator, acc), expression,
  );
  expression = _.reduce(chain,
    (acc, modifier) => applyChain(modifier, acc), expression,
  );
  return expression;
}

function applyDecorator(decorator, expression) {
  return `${decorator}(${expression})`;
}

function applyChain(chain, expression) {
  return `${expression}.${chain}()`;
}
