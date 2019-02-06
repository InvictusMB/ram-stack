# react-mobx-awilix

This is a POC of a basic application with DI container and autowiring.

The application contains stores, services, async operations and reactive views where all the plumbing code is handled by the framework.
Autowiring the routing is a next step.

Application composition root is generated automatically at (babel) build time.

`macros/resolver-rules.js` defines the conventions for autowiring.

Rules describe patterns for picking the files and extracting things to be injected into the container.

Each rule defines:
* a file extension to look for
* a pattern for deriving an export name
* a registration template

Autowiring is kickstarted with `registerRULENAME` macro.

For example, the following code will evalute `Stores` rule in `./user` directory and register all the stores it finds in the `container`: 
```javascript
import * as awilix from 'awilix';
import {registerStores} from '../macros/di-resolver.macro';
const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});
registerStores({container, awilix}, './user');
```
`container` and `awilix` are the references that will be accessible to the defined rule. It is expected that they are defined in the scope where macro is used.

A rule definition might look like this:
```javascript
const _ = require('lodash');
const path = require('path');

const rules = {
  'Stores': {
    ext: '.store.ts',
    getName: ({filePath, ext}) => _.upperFirst(_.camelCase(path.basename(filePath, ext))) + 'Store',
    getContainerRegistration: ({moduleName, filePath, references: r}) =>
      `${_.lowerFirst(moduleName)}: ${r.awilix}.asClass(require('./${filePath}').${moduleName}).singleton()`,
  }
};

module.exports = rules;
```

`filePath` and `ext`(file extension) are provided to define a naming convention and infer `moduleName`.

`moduleName` and `filePath` are then provided to the rule to generate the wiring code.

Given `./user` directory that contains `session.store.ts` and `userProfile.store.ts`, `registerStores({container, awilix}, './user')` macro will expand into:

```javascript
container.register({
 sessionStore: awilix.asClass(require('./app/session.store.ts').sessionStore).singleton(),
 userStore: awilix.asClass(require('./app/user.store.ts').userStore).singleton()
});
```

Rules can compose other rules using `ref`:
```
const rules = {
  'Stores': { /* ... */ },
  'Views': { /* ... */ },
  'Module': {
    ref: ['Stores', 'Views']
  }
};
```
`registerModule({container, awilix}, './user')` will wire both stores and views in `./app` directory now.

Macros that do not match a rule will be removed from output.

Design goals:
* Relative imports should not be needed
* Components should be as framework agnostic as possible
* Wiring rules should remain DI framework independent. Awilix is used as the least obtrusive DI container out there
* Naming conventions should remain adjustable

TODO:
* Also wire routing in the application composition root
* Refactor rules into plain JSON without JS code inside to enforce JSON schema
* Generate TS top level `.d.ts` file with all the things in container to help TypeScript without resorting back to relative path imports again
