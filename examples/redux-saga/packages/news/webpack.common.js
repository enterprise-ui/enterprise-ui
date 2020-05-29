const paths = require('./paths');

module.exports = {
  resolve: {
    extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
    modules: ['node_modules'],
  },

  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
    },
    'react-redux': 'react-redux',
    redux: {
      root: 'Redux',
      commonjs: 'redux',
      commonjs2: 'redux',
    },
    'redux-saga': {
      root: 'ReduxSaga',
      commonjs: 'redux-saga',
      commonjs2: 'redux-saga',
    },
    'redux-saga/effects': {
      root: 'ReduxSagaEffects',
      commonjs: 'redux-saga/effects',
      commonjs2: 'redux-saga/effects',
    },
    '@babel/runtime/regenerator': {
      root: 'regeneratorRuntime',
      commonjs: '@babel/runtime/regenerator',
      commonjs2: '@babel/runtime/regenerator',
    },
    'isomorphic-fetch': 'isomorphic-fetch',
    'react-router-config': 'react-router-config',
    'react-router-dom': 'ReactRouterDOM',
    'react-lazy-load-image-component': 'react-lazy-load-image-component',
    'react-helmet': 'react-helmet',
    '@ssr-react/core': '@ssr-react/core',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              // cache: true,
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
