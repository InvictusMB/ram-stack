import {createElement} from 'react';

export {Fragment} from 'react';

export function jsx(type, props = {}) {
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

export const jsxs = jsx;
