# webpack-hmr-emitter plugin

This plugin emits Webpack HMR code for composition root registrations.

Templates are expected to use the default [lodash templating](https://lodash.com/docs/4.17.14#template) syntax.

**IMPORTANT:** If multiple rules invoke this plugin within the same file, only one of them will work. 

## Plugin options:

 * `templateFilename` (optional, defaults to bundled template) template location relative to `composition-config.json`
 * `template` (optional, overrides `templateFilename`) inline template

## Complete configuration example:
 
```json
{
  "compositionRoots": {
    "container": {
      "plugins": [
        "babel-emitter",
        ["webpack-hmr-emitter", {
          "templateFilename": "./hmr-template.ejs"
        }]
      ]
    } 
  },
  "rules": {
    "Components": {
      "ext": ".component.tsx",
      "registrations.container": {
        "naming.registration.casing": "pascal",
        "naming.identifier.casing": "pascal",
        "decorate": [
          "withContainer",
          "asValue"
        ]
      }
    }  
  }
}
```
