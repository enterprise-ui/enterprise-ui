const paths = require('./paths');

module.exports = {
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
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              cache: true,
              fix: true,
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
          plugins: [
            [require.resolve('@babel/plugin-proposal-decorators'), { legacy: true }],
            require.resolve('@babel/plugin-proposal-class-properties'),
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
