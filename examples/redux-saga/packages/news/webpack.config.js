const merge = require('webpack-merge');
const paths = require('./paths');
const baseConfig = require('./webpack.common');

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  const config = merge(baseConfig, {
    mode: 'production',

    devtool: 'inline-source-map',

    entry: paths.appSrc,

    output: {
      filename: 'bundle.js',
      library: 'news',
      libraryTarget: 'umd',
      path: paths.appBuild,
      publicPath: '/news',
    },
  });

  console.log(config);

  return config;
};
