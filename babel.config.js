module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: '8' },
        modules: 'auto',
        debug: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
      },
    ],
  ],
};
