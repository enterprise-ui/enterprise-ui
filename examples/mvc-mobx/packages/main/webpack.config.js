const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const nodeExternalsOptions = {
  whitelist: []
};

module.exports = {
  entry: './src/index.tsx',
  mode: 'production',
  //   mode: 'development',
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
    library: 'main',
    libraryTarget: 'umd',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/static/main/',
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }


};
