const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const paths = require('./paths');
const baseConfig = require('./webpack.common');

const nodeExternalsOptions = {
  // whitelist: [...Object.keys(baseConfig.externals)],
};

module.exports = function () {
  console.log('paths', paths);

  const config = merge(baseConfig, {
    mode: 'production',

    target: 'node',

    devtool: 'inline-source-map',

    entry: paths.appSrc,

    output: {
      filename: 'index.js',
      globalObject: 'this',
      library: 'AppCore',
      libraryTarget: 'umd',
      path: paths.appBuild,
    },

    // externals: [
    //   {...baseConfig.externals},
    //   nodeExternals({
    //     modulesDir: paths.packageNodeModules,
    //     ...nodeExternalsOptions,
    //   }),
    //   nodeExternals({
    //     modulesDir: paths.appNodeModules,
    //     ...nodeExternalsOptions,
    //   }),
    // ],
  });

  console.log(config);

  return config;
};
