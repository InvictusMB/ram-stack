# react-mobx-awilix

This is a POC of a basic application with DI container and autowiring.

The application contains stores, services, async operations and reactive views where all the plumbing code is handled by the framework.
Autowiring the routing is a next step.

Application composition root is generated automatically at (babel) build time.

`macros/composition-config.js` defines the conventions for autowiring.

Rules describe patterns for picking the files and extracting things to be injected into the container.

Each rule defines:
* a file extension to look for
* one or more `container registration` definitions

Each `container registration` defines:
* a naming convention for deriving an export name
* a naming convention for deriving a registration name within container
* a list of decorators to be applied to the exported value before registration
* a list of modifiers chained to the expression

Autowiring is kickstarted with invoking `registerRULENAME` macro.

For example:
Given `./user` directory that contains `session.store.ts` and `userProfile.store.ts` the following code will evaluate `Stores` rule and register all the stores it finds in `./user` directory with `myContainer`: 
```javascript
import {createContainer, InjectionMode, asClass} from 'awilix';
import {registerStores} from '../macros/composition-root.macro';
const myContainer = createContainer({
  injectionMode: InjectionMode.PROXY,
});

registerStores({myContainer, asClass}, './user');
```
      ↓ ↓ ↓ ↓ ↓ ↓
           
```javascript
import {createContainer, InjectionMode, asClass} from 'awilix';
import {registerStores} from '../macros/composition-root.macro';
const myContainer = createContainer({
  injectionMode: InjectionMode.PROXY,
});

myContainer.register({
 sessionStore: asClass(require('./app/session.store.ts').SessionStore).singleton(),
 userStore: asClass(require('./app/user.store.ts').UserStore).singleton()
});
```

Composition config to produce such output might look like this:

```javascript
module.exports = {
  compositionRoots: {
    'myContainer.template': '<%= root %>.register({<%= registrations %>});',
  },
  rules: {
    'Stores': {
      ext: '.store.ts',
      'registrations.myContainer': {
        'naming.registration.casing': 'camel',
        'naming.registration.suffix': 'Store',
        'naming.identifier.casing': 'pascal',
        'naming.identifier.suffix': 'Store',
        decorators: ['asClass'],
        modifiers: ['singleton'],
      },
    },
  }
};
```

Each rule might produce one or more registrations.
In this example `registrations.myContainer` means the rule will produce a registration for composition root `myContainer`.
There has to be a corresponding template defined for `myContainer` in `compositionRoots` section.

`myContainer` and `asClass` are expected to be defined in the where this macro is used.

Rules can compose other rules using `compose` keyword:
```javascript
module.exports = {
  // ...
  rules: {
    'Stores': { /* ... */ },
    'Views': { /* ... */ },
    'Module': {
      compose: ['Stores', 'Views']
    }
  }
};
```
`registerModule({container, asClass, asValue}, './user')` will wire both stores and views in `./app` directory now.

Rules can extend other rules using `extends` keyword:
```javascript
module.exports = {
  // ...
  rules: {
    'Classes': {
      'registrations.container': {
        'naming.registration.casing': 'camel',
        'naming.identifier.casing': 'pascal',
        decorators: ['asClass'],
        modifiers: ['singleton'],
      },
    },
    'Stores': {
      extends: 'Classes',
      ext: '.store.ts',
      'registrations.container': {
        'naming.registration.suffix': 'Store',
        'naming.identifier.suffix': 'Store',
      },
    },
  }
};
```

Macros that do not match any rule will be removed from output.

Macros can also be marked with `isAbstract` flag to indicate that they should not be used directly.

Design goals:
* Relative imports should not be needed
* Components should be as framework agnostic as possible
* Wiring rules should remain DI framework independent. Awilix is used as the least obtrusive DI container out there
* Naming conventions should remain adjustable

TODO:
* Validate references passed to the macro to match the decorators and containers used in code
* Pass config route to the macro
* YAML for configuration?
* Also wire routing in the application composition root
* Generate TS top level `.d.ts` file with all the things in container to help TypeScript without resorting back to relative path imports again
