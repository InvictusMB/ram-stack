import {asValue, asFunction, useObserver, view, hooks} from '@ram-stack/core';
import hoistStatics from 'hoist-non-react-statics';

import './ram-context';

export function createInjector(container) {
  const shell = createShell(container);
  const ContainerContext = view.createContext(shell);
  container.register({
    Shell: asValue(shell.cradle),
    ContainerContext: asValue(ContainerContext),
  });
  return component => withContainer(ContainerContext, component);
}

export function withContainer(ContainerContext, component) {
  const componentName = (
    component.displayName
    || component.name
    || (component.constructor && component.constructor.name)
    || 'anonymous'
  );

  function Injector(props) {
    const container = hooks.useContext(ContainerContext);
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
  return dependencies;
}
