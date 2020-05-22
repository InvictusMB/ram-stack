import {asValue, asFunction, useObserver} from '@ram-stack/core';
import hoistStatics from 'hoist-non-react-statics';

import './ram-context';

const Injected = (global || window).Injected;

export function createInjector(container) {
  const shell = createShell(container);
  return component => withContainer(shell, component);
}

export function withContainer(container, component) {
  const componentName = (
    component.displayName
    || component.name
    || (component.constructor && component.constructor.name)
    || 'anonymous'
  );

  function Injector(props) {
    const deps = resolveDependencies(container, component);

    const newProps = {
      ...deps,
      ...props,
    };

    return useObserver(() => component(newProps));
  }

  Object.assign(Injector, {
    displayName: `${componentName}-with-container`,
    wrappedComponent: component,
  });

  // Static fields from component should be visible on the wrapped component
  hoistStatics(Injector, component);

  return Injector;
}

function createShell(container) {
  const shell = container.createScope();
  shell.register({
    // react-dev-tools shims
    $$typeof: asValue(undefined),
    size: asFunction(() => Object.keys(shell.registrations).length - 2),
  });
  return shell;
}

function resolveDependencies(diContainer, component) {
  const dependencies = validateDependencies(diContainer, component);
  const registrations = dependencies || [];
  return registrations.reduce((acc, name) => {
    if (name === Injected.Shell) {
      acc[name] = diContainer.cradle;
      return acc;
    }
    acc[name] = diContainer.resolve(name);
    return acc;
  }, {});
}

function validateDependencies(diContainer, component) {
  const {dependencies} = component;
  if (!dependencies) {
    return [];
  }
  if (!Array.isArray(dependencies)) {
    console.warn(
      'Dependencies are expected to be of type "readonly string[]"',
      component,
      dependencies,
    );
    return [];
  }
  return [Injected.Shell].concat(dependencies);
}
