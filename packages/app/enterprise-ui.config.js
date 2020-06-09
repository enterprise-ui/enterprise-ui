const enterprise_ui = require('@enterprise-ui/enterprise-ui');
const LoadablePlugin = require('@loadable/webpack-plugin');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getClientEnvironment = require('react-scripts/config/env');
const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');

const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

module.exports = enterprise_ui.config({
  modules: require('./src/config'),
  webpackClientConfig: {
    configure: (webpackEnv) => {
      const isEnvDevelopment = webpackEnv === 'development';
      // const isEnvProduction = webpackEnv === 'production';
      const isEnvProduction = true;
      const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

      const config = {
        mode: 'production',

        devtool: 'inline-source-map',

        entry: paths.appSrcClient,

        output: {
          filename: '[name].bundle.js',
          chunkFilename: '[name].chunk.js',
          path: path.join(paths.appBuild, 'public'),
          publicPath: paths.publicUrlOrPath,
        },

        resolve: {
          extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
          modules: ['node_modules'],
        },

        externals: {
          '@enterprise-ui/appcore': 'AppCore',
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
          'isomorphic-fetch': 'isomorphic-fetch',
          // '@babel/runtime/regenerator': 'regeneratorRuntime',
        },

        plugins: [
          new HtmlWebpackPlugin(
            Object.assign(
              {},
              {
                inject: true,
                template: paths.appHtml,
              },
              isEnvProduction
                ? {
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
                  }
                : undefined,
            ),
          ),
          isEnvProduction &&
            shouldInlineRuntimeChunk &&
            new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
          new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
          new LoadablePlugin(),
          new CopyPlugin({
            patterns: [
              {
                from: path.dirname(require.resolve('@enterprise-ui/news')),
                to: path.join(paths.appBuild, 'public', 'news'),
              },
            ],
            options: {
              concurrency: 100,
            },
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
              include: [paths.appSrcClient, ...paths.packageDependencies],
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

      console.log(config);

      return config;
    },
  },
  webpackNodeConfig: {
    configure: () => {
      const externals = {
        '@enterprise-ui/appcore': 'AppCore',
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
      };

      const nodeExternalsOptions = {
        whitelist: [...Object.keys(externals)],
      };

      const config = {
        mode: 'production',

        target: 'node',

        devtool: 'inline-source-map',

        entry: paths.appSrcServer,

        output: {
          filename: 'www.js',
          globalObject: 'this',
          libraryTarget: 'commonjs',
          path: path.join(paths.appBuild),
          publicPath: paths.publicUrlOrPath,
        },

        resolve: {
          extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
          modules: ['node_modules'],
        },

        // externals: [
        //   {...externals},
        //   nodeExternals({
        //     modulesDir: paths.packageNodeModules,
        //     ...nodeExternalsOptions,
        //   }),
        //   nodeExternals({
        //     modulesDir: paths.appNodeModules,
        //     ...nodeExternalsOptions,
        //   }),
        // ],

        plugins: [
          new CopyPlugin({
            patterns: [
              {
                from: path.dirname(require.resolve('@enterprise-ui/news')),
                to: path.join(paths.appBuild, 'public', 'news'),
              },
            ],
            options: {
              concurrency: 100,
            },
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
              include: [paths.appSrcServer],
            },
            {
              test: /\.(js|jsx|ts|tsx)$/,
              include: [paths.appSrcClient, paths.appSrcServer, ...paths.packageDependencies],
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

      console.log(config);

      return config;
    },
  },
});
