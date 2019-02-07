//@ts-ignore

module.exports = {
  compositionRoots: {
    'container.template': '<%= root %>.register({<%= registrations %>});',
  },
  rules: {
    'Classes': {
      isAbstract: true,
      'registrations.container': {
        'registrationNaming.casing': 'camel',
        'identifierNaming.casing': 'pascal',
        decorators: ['asClass'],
        modifiers: ['singleton'],
      },
    },
    'Components': {
      ext: '.component.tsx',
      'registrations.container': {
        'registrationNaming.casing': 'pascal',
        'identifierNaming.casing': 'pascal',
        decorators: ['withContainer', 'asValue'],
      },
    },
    'Views': {
      extends: 'Components',
      ext: '.view.tsx',
      'registrations.container': {
        'registrationNaming.suffix': 'View',
        'identifierNaming.suffix': 'View',
        decorators: ['observer', 'withContainer', 'asValue'],
      },
    },
    'Pages': {
      extends: 'Views',
      ext: '.page.tsx',
      'registrations.container': {
        'registrationNaming.suffix': 'Page',
        'identifierNaming.suffix': 'Page',
      },
    },
    'Stores': {
      extends: 'Classes',
      ext: '.store.ts',
      'registrations.container': {
        'registrationNaming.suffix': 'Store',
        'identifierNaming.suffix': 'Store',
      },
    },
    'Services': {
      extends: 'Classes',
      ext: '.service.ts',
      'registrations.container': {
        'registrationNaming.suffix': 'Service',
        'identifierNaming.suffix': 'Service',
      },
    },
    'Module': {
      compose: ['Components', 'Views', 'Pages', 'Stores', 'Services'],
    },
  },
};
