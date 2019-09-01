module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
        },
      },
    ],
    ['@babel/preset-typescript'],
    ['@vue/app']
  ];

  const plugins = [
  ];

  return {
    presets,
    plugins,
  };
};
