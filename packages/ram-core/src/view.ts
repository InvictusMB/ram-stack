export {
  createRef,
  createElement,
  cloneElement,
  createContext,
  memo,
} from 'react';

export {
  render as renderDom,
} from 'react-dom';

import ReactDOM from 'react-dom/client'

export function createRoot(el: Element | DocumentFragment, options?: ReactDOM.RootOptions) {
  return ReactDOM.createRoot(el, options);
}
