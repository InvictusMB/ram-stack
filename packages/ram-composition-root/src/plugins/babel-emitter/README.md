# babel-emitter plugin

This plugin passes rule matches into `template` or `templateFilename` and emits output to replace macro invocation.

Templates are expected to use the default [lodash templating](https://lodash.com/docs/4.17.14#template) syntax.

## Plugin options:

 * `templateFilename` (optional, defaults to bundled template) template location relative to `composition-config.json`
 * `template` (optional, overrides `templateFilename`) inline template

## Complete configuration example:
 
```json
{
  "plugins": [
    ["babel-emitter"]
  ],
  "compositionRoots": {
    "container": {
      "plugins": [
        ["babel-emitter", {
          "templateFilename": "./registration-template.ejs"
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
