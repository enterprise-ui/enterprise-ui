const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const merge = require('webpack-merge');
const paths = require('./paths');
const baseConfig = require('./webpack.common');

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  return merge(baseConfig, {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',

    devtool: 'inline-source-map',

    entry: {
      news: paths.appSrc,
      config: paths.appConfig,
    },

    output: {
      filename: '[name].js',
      globalObject: 'this',
      path: paths.appBuild,
    },

    // plugins: [new BundleAnalyzerPlugin()],
  });
};
