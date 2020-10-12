module.exports = {
  'plugins': [
    [
      '@babel/plugin-transform-react-jsx',
      {
        'throwIfNamespace': true,
        'runtime': 'automatic',
        'importSource': '@ram-stack/core',
      },
    ],
  ],
};
