const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const webpack = require('webpack');
const express = require('express');

module.exports = {
  modules: {
    '/main': '@enterprise-ui/mvc-mobx-main'
  },
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const include =    [
        // packages/app/src',
        webpackConfig.module.rules[1].include,
      ]
      // ../../node_modules/cra-ts-styled-boilerplate-uikit/src is not working, because node_modules is in exclude
      // .concat([
      //   'cra-ts-styled-boilerplate-uikit',
      // ].map(p => path.resolve(__dirname, '../../node_modules', p, 'src')))

      // ../uikit/src works
      .concat([
        'main'
      ].map(p => path.resolve(__dirname, '..', p, 'dist')));

      console.log('include', include);
      // linter
      webpackConfig.module.rules[1].include = include;
      // loader
      webpackConfig.module.rules[2].oneOf[1].include = include;

      webpackConfig.plugins = webpackConfig.plugins.concat(new LoadablePlugin());


      webpackConfig.mode = "production"

      webpackConfig.externals = {
        "react": "React",
        "react-dom": "ReactDOM"
      }

      return webpackConfig
    },
  },
  devServer: {
    before: function(app, server, compiler) {
      app.use(
        '/modules/main/',
        express.static(path.dirname(require.resolve('@enterprise-ui/mvc-mobx-main')))
      )
    }
  }
}