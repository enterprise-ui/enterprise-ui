module.exports = {
  createWebpackConfig: (options) => {
    const {
      babelIncludes = [],
      babelOptions = {},
      entries,
      externals = {},
      filename = 'bundle.js',
      chunkFilename,
      umd = true,
      outputPath,
      packageJsonPath,
      plugins = [],
      publicPath,
      resolve = {},
      webpackEnv,
    } = options;

    const { plugins: babelPlugins = [] } = babelOptions;

    console.log('options', options);

    const packageJson = packageJsonPath ? require(packageJsonPath) : {};

    const params = packageJson['enterprise-ui'];

    console.log('Create webpack config with params', params);

    const { key, publicPath: packagePublicPath } = params || {};

    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    const config = {
      mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',

      devtool: 'inline-source-map',

      entry: entries,

      output: {
        filename,
        chunkFilename,
        ...(umd ? { library: key, libraryTarget: 'umd' } : {}),
        path: outputPath,
        publicPath: publicPath || packagePublicPath,
      },

      resolve: {
        extensions: ['js', 'ts', 'tsx', 'json', 'jsx'].map((ext) => `.${ext}`),
        modules: ['node_modules'],
        ...resolve,
      },

      externals: {
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
        ...externals,
      },

      plugins: [...plugins],

      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            enforce: 'pre',
            use: [
              {
                options: {
                  // cache: true,
                  eslintPath: require.resolve('eslint'),
                  resolvePluginsRelativeTo: __dirname,
                  useEslintrc: true,
                },
                loader: require.resolve('eslint-loader'),
              },
            ],
            include: [...entries],
          },
          {
            test: /\.(js|jsx|ts|tsx)$/,
            include: [...entries, ...babelIncludes],
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
                ...babelPlugins,
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

    return config;
  },
};
