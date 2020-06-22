const LoadablePlugin = require('@loadable/webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getClientEnvironment = require('react-scripts/config/env');
const webpack = require('webpack');
const paths = require('./paths');

const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = (webpackEnv, isDevServerMode = false, workspaces = []) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  console.log('webpackEnv', webpackEnv);
  console.log('isDevServerMode', isDevServerMode);
  console.log('workspaces', workspaces);
  console.log('paths', paths);

  let externals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    redux: 'Redux',
    'react-router': 'ReactRouter',
    'react-router-config': 'ReactRouterConfig',
    'react-router-dom': 'ReactRouterDOM',
    'redux-saga': 'ReduxSaga',
    'redux-saga/effects': 'ReduxSagaEffects',
    'redux-thunk': 'ReduxThunk'
  };

  const scripts = ['<script crossorigin src="/vendors/vendors.production.min.js"></script>'];

  if (!isDevServerMode) {
    externals = {...externals, '@enterprise-ui/appcore': 'AppCore'};
    scripts.push('<script crossorigin src="/core/appcore.production.min.js"></script>');
  }

  const config = {
    mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',

    devtool: 'inline-source-map',

    entry: paths.appSrcClient,

    output: {
      filename: '[name].bundle.js',
      chunkFilename: '[name].chunk.js',
      path: paths.appBuild,
      publicPath: paths.publicUrlOrPath,
    },

    resolve: {
      alias: isDevServerMode ? {
        '@enterprise-ui/appcore': '@enterprise-ui/appcore/src/index.ts',
        '@enterprise-ui/news': '@enterprise-ui/news/src/index.ts'
      } : {},
      extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
      modules: ['node_modules'],
    },

    externals,

    plugins: [
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          },
        ),
      ),
      shouldInlineRuntimeChunk && new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {...env.raw, SCRIPTS: scripts.join('')}),
      new LoadablePlugin(),
      new CopyPlugin({
        patterns: [
          {
            from: path.dirname(require.resolve('@enterprise-ui/news')),
            to: path.join(paths.appBuild, 'news'),
          },
        ],
        options: {
          concurrency: 100,
        },
      }),
      new webpack.DefinePlugin({
        DEV_SERVER_MODE: JSON.stringify(isDevServerMode),
      }),
    ],

    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          enforce: 'pre',
          use: [
            {
              options: {
                cache: true,
                eslintPath: require.resolve('eslint'),
                resolvePluginsRelativeTo: __dirname,
                useEslintrc: true,
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: [paths.appSrcClient],
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [paths.appSrcClient, ...(isDevServerMode ? paths.platformDependencies : []), ...workspaces],
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            plugins: [
              [
                require.resolve('@babel/plugin-transform-runtime'),
                {
                  regenerator: true,
                },
              ],
              [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
              require.resolve('@babel/plugin-proposal-class-properties'),
              require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
              require.resolve('@babel/plugin-proposal-optional-chaining'),
            ],
            presets: [
              require.resolve('@babel/preset-env'),
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-typescript'),
            ],
          },
        },
      ],
    },
  };

  console.log('App webpack config', config);

  return config;
};
