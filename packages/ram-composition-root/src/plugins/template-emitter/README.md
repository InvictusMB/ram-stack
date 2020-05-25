# template-emitter plugin

This plugin passes rule matches into `templateFilename` and writes output into a file at `outputFilename` location. A rule must contain an entry matching `configPath` option to be recognized by the plugin.

Templates are expected to use default [lodash templating](https://lodash.com/docs/4.17.14#template) syntax.

Common usage scenario would be to set up code generation of TypeScript definitions based on things extracted by `composition-root` macro. 

## Plugin options:

 * `configPath` location of a config withing a composition rule 
 * `placeholders` placeholders to be populated within the template
 * `templateFilename` template location relative to `composition-config.json`
 * `outputFilename` output location relative to `composition-config.json`

## Rule level configuration:

```json
{
  "[CONFIG_PATH]": {
    "template": {
      "[PLACEHODER_NAME]": "<%= registration %>: typeof import('./<%= filePath %>').<%= identifier %>"  
    }
  }
}
```

 * `[CONFIG_PATH]` is a name used in `template-emitter` configuration
 * `[PLACEHODER_NAME]` is a name corresponding to one of the placeholders in a template
 * `registration`, `identifier` and `filePath` are values produced by evaluating a rule against each file system match

Rule level templates are evaluated and passed to the `templateFilename` template as a single `[PLACEHODER_NAME]` value.

## Complete configuration example:
 
```json
{
  "compositionRoots": {
    "container": {
      "plugins": [
        ["template-emitter", {
          "configPath": "tsContext",
          "placeholders": ["top", "shell"],
          "templateFilename": "./ram-context.d.ts.template",
          "outputFilename": "./ram-context.d.ts"
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
        ],
        "tsContext": {
          "template.shell": "<%= registration %>: typeof import('./<%= filePath %>').<%= identifier %>"
        }
      }
    }  
  }
}
```
