# Material UI Icons macro

A macro for expanding [Material-UI](https://github.com/mui-org/material-ui) Icons imports. 

Material-UI encourages usage of direct deep imports.

```es6
// Material-UI suggested import
import CheckBox from '@material-ui/icons/CheckBox';
```

While that is motivated by impact on bundle size and build performance it might cause certain aesthetic and readability issues.

This macro enables the usage of namespace import without harming either.

The transformation:

```es6
import MuiIcons from '@ram-stack/material-ui-icons.macro';

function Component() {
  return (
    <span>
      <MuiIcons.Checkbox /> some text
    </span>
  );
}
      ↓ ↓ ↓ ↓ ↓ ↓
import MuiIcons_Checkbox from '@material-ui/icons/Checkbox';

function Component() {
  return (
    <span>
      <MuiIcons_Checkbox /> some text
    </span>
  );
}
```

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and
should be installed as one of your project's `devDependencies`:

```bash
npm install --save-dev @ram-stack/material-ui-icons.macro
```

Assuming the project has `babel-plugin-macros` already configured (such as Create React App v2+ projects) no further action is required.
Otherwise see [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros) guide first.

## Usage 

This macro is a drop in replacement for `@material-ui/icons` imports.
Replacing `import * as MuiIcons from '@material-ui/icons'` with `import MuiIcons from '@ram-stack/material-ui-icons.macro` is the only thing needed.

The `MuiIcons` identifier can be renamed arbitrarily. The macro does not care about names.

### TypeScript usage

No extra setup is required. This package reexports the typings from `@material-ui/icons` and the typechecking works as if no substitution happened. 

## See also

[`@ram-stack/material-ui.macro`](../material-ui.macro/README.md)

[`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros)

## License

[MIT](LICENSE)
