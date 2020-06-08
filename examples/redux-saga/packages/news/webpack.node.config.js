const merge = require('webpack-merge');
const paths = require('./paths');
const baseConfig = require('./webpack.common');

module.exports = function () {
  console.log('paths', paths);

  const config = merge(baseConfig, {
    mode: 'production',

    target: 'node',

    devtool: 'inline-source-map',

    entry: paths.appSrc,

    output: {
      filename: 'news.js',
      globalObject: 'this',
      library: 'news',
      libraryTarget: 'umd',
      path: paths.appBuild,
      publicPath: '/news',
    },
  });

  console.log(config);

  return config;
};
