const {createElement, Fragment} = require('react');

module.exports = {
  Fragment,
  jsx,
  jsxs: jsx,
}

function jsx(type, props = {}) {
  const {children, ...rest} = props;
  if (children) {
    if (Array.isArray(children)) {
      return createElement(type, rest, ...children);
    } else {
      return createElement(type, rest, children);
    }
  }
  return createElement(type, props);
}
