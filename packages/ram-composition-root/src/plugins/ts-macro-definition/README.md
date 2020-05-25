# ts-macro-definition plugin

This plugin renders the rules defined in `composition-config` into a `.d.ts` file to provide TypeScript validation for the macro calls

## Plugin options:

 * `templateFilename` (optional, defaults to bundled template) template location relative to `composition-config.json`
 * `outputFilename` (optional, defaults to `composition-root.d.ts`) output location relative to `composition-config.json`

## Complete configuration example:
 
```json
{
  "plugins": [
    ["ts-macro-definition", {
      "templateFilename": "./composition-root.ejs",
      "outputFilename": "./composition-root.d.ts"
    }]
  ],
  "compositionRoots": {
    "container": {}
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
