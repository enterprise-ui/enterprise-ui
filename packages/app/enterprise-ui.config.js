const enterprise_ui = require('@enterprise-ui/enterprise-ui');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const getClientEnvironment = require('react-scripts/config/env');
const paths = require('./paths');

const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

module.exports = enterprise_ui.config({
  modules: require('./src/config'),
  webpackClientConfig: {
    configure: (webpackEnv) => {
      const isEnvDevelopment = webpackEnv === 'development';
      const isEnvProduction = webpackEnv === 'production';
      const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

      return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',

        devtool: 'inline-source-map',

        entry: paths.appSrc,

        output: {
          filename: '[name].[hash].bundle.js',
          chunkFilename: '[name].[chunkhash].chunk.js',
          path: path.join(paths.appBuild, 'public'),
          publicPath: paths.publicUrlOrPath,
        },

        resolve: {
          extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
          modules: ['node_modules'],
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
              include: [paths.appSrc],
            },
            {
              test: /\.(js|jsx|ts|tsx)$/,
              include: [paths.appSrc, ...paths.packageDependencies],
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
    },
  },
});
