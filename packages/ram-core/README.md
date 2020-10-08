# ram-stack/core

This package hosts an opinionated set of dependencies for a typical [React](https://github.com/facebook/react) [Awilix](https://github.com/jeffijoe/awilix) [MobX](https://github.com/mobxjs/mobx) app.

Examples of usage are available in [Sample App](https://github.com/InvictusMB/ram-stack/tree/master/packages/ram-sample-app) 

## Composition root

Composition root is a place where all the application components are loaded into.

```tsx
import {createCompositionRoot} from '@ram-stack/core';

const root = createCompositionRoot<InjectedDependencies>({
  onReady: () => console.log('ready'),
});
```

`InjectedDependencies` is a type containing all the things injected by a DI container.
`onReady` is a callback invoked when `load` operation completes. If [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/) is enabled, `onReady` will be invoked every time any module is updated.

Arbitrary objects or values can be registered in a container within composition root

```tsx
import {di} from '@ram-stack/core';

root.container.register({
  foo: di.asValue('foo'),         // will be resolved as value
  bar: di.asClass(BarClass),      // will be resolved as class instance
  baz: di.asFuntion(() => 'baz'), // will be resolved as function return value
});
```

## Rendering root component

```tsx
import {view} from '@ram-stack/core';

const MyComponent = root.container.resolve('MyComponent');

view.renderDom((
  <MyComponent />
), document.getElementById('root'));
```

## Using hooks

```tsx
import {hooks} from '@ram-stack/core';

export function MyComponent() {
  const [foo, setFoo] = hooks.useState(true);
}

```

## Using router components

```tsx
import {router} from '@ram-stack/core';

export function MyRedirectComponent() {
  return (
    <router.Redirect to={'/some/route'} />
  );
}

export function MyLinkComponent() {
  return (
    <router.Link to={'/some/route'}>
      My Link
    </router.Link>
  );
}
```

