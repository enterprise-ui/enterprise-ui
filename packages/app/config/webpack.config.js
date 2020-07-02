const LoadablePlugin = require('@loadable/webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getClientEnvironment = require('react-scripts/config/env');
const paths = require('./paths');

const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';
const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = (webpackEnv, isDevServerMode = false, workspaces = []) => {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';

  console.log('webpackEnv', webpackEnv);
  console.log('isDevServerMode', isDevServerMode);
  console.log('paths', paths);
  console.log('workspaces', workspaces);

  let externals = {
    '@enterprise-ui/appcore': 'AppCore',
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-redux': 'ReactRedux',
    redux: 'Redux',
    'react-router': 'ReactRouter',
    'react-router-config': 'ReactRouterConfig',
    'react-router-dom': 'ReactRouterDOM',
    'redux-saga': 'ReduxSaga',
    'redux-saga/effects': 'ReduxSagaEffects',
    'redux-thunk': 'ReduxThunk',
  };

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
      alias: isDevServerMode
        ? {
            ...workspaces.reduce(
              (acc, w) =>
                !w.isStatic
                  ? {
                      ...acc,
                      [w.packageName]: path.join(w.packagePath, w.mainsrc),
                    }
                  : acc,
              {},
            ),
          }
        : {},
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
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new LoadablePlugin(),
      new CopyPlugin({
        patterns: workspaces
          .filter((w) => w.isStatic)
          .map((w) => ({
            from: path.dirname(require.resolve(w.packageName)),
            to: path.join(paths.appBuild, w.publicPath),
          })),
        options: {
          concurrency: 100,
        },
      }),
    ].filter((plugin) => plugin),

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
          include: [
            paths.appSrcClient,
            ...(isDevServerMode
              ? [
                  ...workspaces
                    .filter((w) => !w.isStatic)
                    .map((w) => path.join(w.packagePath, 'src')),
                ]
              : []),
          ],
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
