const _ = require('lodash');

module.exports = {
  renderRegistration
};

function renderRegistration(registrationData) {
  const {
    identifier,
    registration,
    filePath,
    rule,
  } = registrationData;
  const {
    decorators = [],
    modifiers = [],
  } = rule;
  let expression = `require('./${filePath}').${identifier}`;
  expression = _.reduce(decorators,
    (acc, decorator) => applyDecorator(decorator, acc), expression,
  );
  expression = _.reduce(modifiers,
    (acc, modifier) => applyModifier(modifier, acc), expression,
  );

  return `${registration}: ${expression}`;
}

function applyDecorator(decorator, expr) {
  return `${decorator}(${expr})`;
}

function applyModifier(modifier, expr) {
  return `${expr}.${modifier}()`;
}
