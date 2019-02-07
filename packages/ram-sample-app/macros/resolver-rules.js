//@ts-ignore

module.exports = {
  compositionRoots: {
    container: {
      template: '<%= root %>.register({<%= registrations %>});',
    },
  },
  rules: {
    'Views': {
      ext: '.view.tsx',
      registrations: {
        container: {
          registrationNaming: {
            casing: 'pascal',
            suffix: 'View',
          },
          identifierNaming: {
            casing: 'pascal',
            suffix: 'View',
          },
          decorators: ['observer', 'withContainer', 'asValue'],
        },
      },
    },
    'Components': {
      ext: '.component.tsx',
      registrations: {
        container: {
          registrationNaming: {
            casing: 'pascal',
          },
          identifierNaming: {
            casing: 'pascal',
          },
          decorators: ['withContainer', 'asValue'],
        },
      },
    },
    'Pages': {
      ext: '.page.tsx',
      registrations: {
        container: {
          registrationNaming: {
            casing: 'pascal',
            suffix: 'Page',
          },
          identifierNaming: {
            casing: 'pascal',
            suffix: 'Page',
          },
          decorators: ['observer', 'withContainer', 'asValue'],
        },
      },
    },
    'Stores': {
      ext: '.store.ts',
      registrations: {
        container: {
          registrationNaming: {
            casing: 'camel',
            suffix: 'Store',
          },
          identifierNaming: {
            casing: 'pascal',
            suffix: 'Store',
          },
          decorators: ['asClass'],
          modifiers: ['singleton'],
        },
      },
    },
    'Services': {
      ext: '.service.ts',
      registrations: {
        container: {
          registrationNaming: {
            casing: 'camel',
            suffix: 'Service',
          },
          identifierNaming: {
            casing: 'pascal',
            suffix: 'Service',
          },
          decorators: ['asClass'],
          modifiers: ['singleton'],
        },
      },
    },
    'Module': {
      compose: ['Views', 'Components', 'Stores', 'Services', 'Pages'],
    },
  },
};
