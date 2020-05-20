const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const nodeExternalsOptions = {
  whitelist: []
};

module.exports = {
  entry: './src/index.tsx',
  // mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    library: 'mymodule',
    libraryTarget: 'umd',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  // externals: [
  //   nodeExternals({
  //     modulesDir: path.resolve(__dirname, '../../../../node_modules'),
  //     ...nodeExternalsOptions,
  //   }),
  // ],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      'React':     'react'
    })
  ],


};
