# Material UI macro

A macro for expanding [Material-UI](https://github.com/mui-org/material-ui) imports. 

Material-UI encourages usage of direct deep imports.

```es6
// Material-UI suggested import
import Button from '@material-ui/core/Button';
```

While that is motivated by impact on bundle size and build performance it might cause certain aesthetic and readability issues.

This macro enables the usage of namespace import without harming either.

The transformation:

```es6
import MUI from '@ram-stack/material-ui.macro';

function Component() {
  return (
    <MUI.Button>
      <MUI.Typography>
        Caption
      </MUI.Typography>
    </MUI.Button>
  );
}
      ↓ ↓ ↓ ↓ ↓ ↓
import MUI_Button from '@material-ui/core/Button';
import MUI_Typography from '@material-ui/core/Typography';

function Component() {
  return (
    <MUI_Button>
      <MUI_Typography>
        Caption
      </MUI_Typography>
    <MUI_Button>
  );
}
```

## Installation

This module is distributed via [npm](https://www.npmjs.com/) which is bundled with [node](https://nodejs.org/) and
should be installed as one of your project's `devDependencies`:

```bash
npm install --save-dev @ram-stack/material-ui.macro
```

Assuming the project has `babel-plugin-macros` already configured (such as Create React App v2+ projects) no further action is required.
Otherwise see [`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros) guide first.

## Usage 

This macro is a drop in replacement for `@material-ui/core` imports.
Replacing `import * as MUI from '@material-ui/core'` with `import MUI from '@ram-stack/material-ui.macro` is the only thing needed.

The `MUI` identifier can be renamed arbitrarily. The macro does not care about names.

### TypeScript usage

No extra setup is required. This package reexports the typings from `@material-ui/core` and the typechecking works as if no substitution happened. 

## See also

[`@ram-stack/material-ui-cons.macro`](../material-ui-icons.macro/README.md)
[`@ram-stack/import-replacer-helper`](../import-replacer-helper/README.md)

[`babel-plugin-macros`](https://github.com/kentcdodds/babel-plugin-macros)

## License

[MIT](LICENSE)
