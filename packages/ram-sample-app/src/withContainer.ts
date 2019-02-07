import hoistStatics from 'hoist-non-react-statics';
import {Component, createElement} from 'react';

export function createInjector(container) {
  return (component) => withContainer(container, component);
}

export function withContainer(container, component) {

  const componentName = (
    component.displayName
    || component.name
    || (component.constructor && component.constructor.name)
    || 'Unknown'
  );

  class Injector extends Component {
    static displayName = `inject-${componentName}-with-DI-container`;
    static wrappedComponent;
    wrappedInstance;

    storeRef = (instance) => {
      this.wrappedInstance = instance;
    };

    render() {
      const Shell = resolveContainer(container);
      const newProps: any = {...Shell, Shell, ...this.props};

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
