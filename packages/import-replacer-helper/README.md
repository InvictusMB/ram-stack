# Import replacer helper

This package provides a helper for creating [Babel macros](https://github.com/kentcdodds/babel-plugin-macros) that expand namespace imports into direct imports.
It is useful for consuming libraries like [Material-UI](https://github.com/mui-org/material-ui) which bundle a large number of standalone modules.

For these libraries using a namespace import (`import * as MUI from '@material-ui/core'`) compromises build performance and bundle size (see [tree-shaking](https://webpack.js.org/guides/tree-shaking/)). 

A macro such as [`@ram-stack/material-ui.macro`](../material-ui.macro/README.md) prevents above mentioned issues by replacing namespace import with only a necessary subset of direct imports.
Doing that proactively helps the compiler and bundler to exclude unused code and avoid extra work.

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and should be installed as one of your project's `dependencies`:

```bash
npm install --save @ram-stack/import-replacer-helper
```

## Usage 

`import-replacer-helper` API consists of a single function: `createReplacerMacro`.
`createReplacerMacro` takes replacer function `getPath` and preferred default namespace import statement `defaultNamespaceImport` and returns an instance of a macro that can be exported and consumed by [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros).

### Example

```es6
const {createReplacerMacro} = require('@ram-stack/import-replacer-helper');
const {name: packageName} = require('./package');

module.exports = createReplacerMacro({
  getPath: name => `@material-ui/core/${name}`,
  defaultNamespaceImport: `import MUI from '${packageName}'`,
});
```

### TypeScript usage

If a package targeted by the macro provides TypeScript type definitions it is recommended to reexport those definitions from the macro package itself.
In order to achieve this, a typings file should be created. For example, `macro.d.ts`:

```typescript
/* macro.d.ts */
export * from '@material-ui/core';
export {default} from '@material-ui/core';
```

Then it has to be referenced in `package.json`:
```diff
+  "types": "macro.d.ts",
```

## See also

[`@ram-stack/material-ui.macro`](../material-ui.macro/README.md)
[`@ram-stack/material-ui-cons.macro`](../material-ui-icons.macro/README.md)

[`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros)

## License

[MIT](LICENSE)
