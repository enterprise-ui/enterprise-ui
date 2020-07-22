const apputils = require('@enterprise-ui/apputils');
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
  const config = apputils.createWebpackConfig({
    babelIncludes: isDevServerMode
      ? [...workspaces.filter((w) => w.useSrc).map((w) => path.join(w.packagePath, 'src'))]
      : [],
    babelOptions: {
      plugins: [
        require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
        require.resolve('@babel/plugin-proposal-optional-chaining'),
      ],
    },
    entries: [paths.appSrcClient],
    chunkFilename: '[name].chunk.js',
    filename: '[name].bundle.js',
    outputPath: paths.appBuild,
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
      new CopyPlugin({
        patterns: workspaces
          .filter((w) => !w.useSrc)
          .map((w) => ({
            from: path.dirname(require.resolve(w.packageName)),
            to: path.join(paths.appBuild, w.publicPath),
          })),
        options: {
          concurrency: 100,
        },
      }),
    ].filter((plugin) => plugin),
    publicPath: paths.publicUrlOrPath,
    resolve: {
      alias: isDevServerMode
        ? {
            ...workspaces.reduce(
              (acc, w) =>
                w.useSrc
                  ? {
                      ...acc,
                      [w.packageName]: path.join(w.packagePath, w.mainsrc),
                    }
                  : acc,
              {},
            ),
          }
        : {},
    },
    umd: false,
    webpackEnv,
  });

  console.log('webpackConfig', config);

  return config;
};
