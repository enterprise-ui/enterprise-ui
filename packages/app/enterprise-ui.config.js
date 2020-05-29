const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const enterprise_ui = require('@enterprise-ui/enterprise-ui');
const paths = require('./paths');

module.exports = enterprise_ui.config({
  modules: require('./src/config'),
  webpackClientConfig: {
    configure: (env) => {
      const isEnvDevelopment = env === 'development';
      const isEnvProduction = env === 'production';

      return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',

        devtool: 'inline-source-map',

        entry: paths.appSrc,

        output: {
          filename: '[name].[hash].bundle.js',
          chunkFilename: '[name].[chunkhash].chunk.js',
          path: path.join(paths.appBuild, 'public'),
        },

        resolve: {
          extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
          modules: ['node_modules'],
        },

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
              include: [paths.appSrc],
            },
            {
              test: /\.(js|jsx|ts|tsx)$/,
              include: [paths.appSrc],
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
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
