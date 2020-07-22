const path = require('path');
const LoadablePlugin = require('@loadable/webpack-plugin');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const express = require('express');
const enterprise_ui = require('@enterprise-ui/enterprise-ui')

module.exports = enterprise_ui.config({
  modules: require('./src/config'),
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const include = [
        webpackConfig.module.rules[1].include,
      ]

      .concat([
        'main'
      ].map(p => path.resolve(__dirname, '..', p, 'dist')));

      console.log('include', include);
      // linter
      webpackConfig.module.rules[1].include = include;
      // loader
      webpackConfig.module.rules[2].oneOf[1].include = include;

      webpackConfig.plugins = webpackConfig.plugins.concat([
        new LoadablePlugin(),
        new CopyPlugin({
          patterns: [
            { from: path.dirname(require.resolve('@enterprise-ui/mvc-mobx-main')), to: 'static/main' },
          ],
          options: {
            concurrency: 100,
          },
        }),
      ]);


      webpackConfig.mode = "production"

      webpackConfig.externals = {
        "react": "React",
        "react-dom": "ReactDOM"
      }

      return webpackConfig
    },
  },
  // devServer: {
  //   before: function(app, server, compiler) {
  //     app.use(
  //       '/main/',
  //       express.static(path.dirname(require.resolve('@enterprise-ui/mvc-mobx-main')))
  //     )
  //   }
  // }
})