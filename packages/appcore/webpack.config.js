// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const paths = require('./paths');
const baseConfig = require('./webpack.common');

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  return merge(baseConfig, {
    // mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
    mode: 'production',

    // devtool: 'inline-source-map',

    entry: paths.appSrc,

    output: {
      filename: 'index.js',
      library: 'AppCore',
      libraryTarget: 'umd',
      path: paths.appBuild,
    },

    // plugins: [new BundleAnalyzerPlugin()],
  });
};
