import hoistStatics from 'hoist-non-react-statics';
import {Component, createElement} from 'react';

import {container} from './di';

export function withContainer(component) {
  let displayName =
    'inject-' +
    (component.displayName ||
      component.name ||
      (component.constructor && component.constructor.name) ||
      'Unknown');
  displayName += '-with-DI-container';

  class Injector extends Component {
    static displayName = displayName;
    static wrappedComponent;
    wrappedInstance;

    storeRef = (instance) => {
      this.wrappedInstance = instance;
    };

    render() {
      const newProps: any = {...resolveContainer(container), ...this.props};

      if (!isStateless(component)) {
        newProps.ref = this.storeRef;
      }

      return createElement(component, newProps);
    }
  }

  // Static fields from component should be visible on the generated Injector
  hoistStatics(Injector, component);

  Injector.wrappedComponent = component;

  return Injector;
}

export function isStateless(component) {
  // `function() {}` has prototype, but `() => {}` doesn't
  // `() => {}` via Babel has prototype too.
  return !(component.prototype && component.prototype.render);
}

function resolveContainer(diContainer) {
  const registrations = Object.keys(diContainer.registrations);
  return registrations.reduce((acc, name) => {
    acc[name] = diContainer.resolve(name);
    return acc;
  }, {}) as any;
}
