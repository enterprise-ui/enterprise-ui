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

    devtool: 'inline-source-map',

    entry: paths.appSrc,

    output: {
      filename: 'index.js',
      globalObject: 'this',
      library: 'AppCore',
      libraryTarget: 'umd',
      path: paths.appBuild,
    },

    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-redux': 'ReactRedux',
      'redux': 'Redux',
      'react-router': 'ReactRouter',
      'react-router-config': 'ReactRouterConfig',
      'react-router-dom': 'ReactRouterDOM',
      'redux-saga': 'ReduxSaga',
      'redux-saga/effects': 'ReduxSagaEffects',
      'redux-thunk': 'ReduxThunk',
      // '@babel/runtime/regenerator': {
      //   root: 'regeneratorRuntime',
      //   commonjs: '@babel/runtime/regenerator',
      //   commonjs2: '@babel/runtime/regenerator',
      // },
    },

    // plugins: [new BundleAnalyzerPlugin()],
  });
};
