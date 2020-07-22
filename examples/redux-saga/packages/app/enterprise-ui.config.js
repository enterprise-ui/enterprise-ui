const enterprise_ui = require('@enterprise-ui/enterprise-ui');
const getWebpackConfig = require('./config/webpack.config');
const getWebpackDevServerConfig = require('./config/webpackDevServer.config');

module.exports = enterprise_ui.config({
  configFactory: {
    configure: (webpackEnv, isDevServerMode, workspaces) => getWebpackConfig(webpackEnv, isDevServerMode, workspaces),
  },
  createDevServerConfig: {
    configure: (proxy, allowedHost) => getWebpackDevServerConfig(proxy, allowedHost),
  },
  paths: require('./config/paths'),
  packages: [
    '@enterprise-ui/films',
    '@enterprise-ui/news'
  ],
  platforms: [
    '@enterprise-ui/appcore/build/bundle.js'
  ],
  vendors: [
    'react/umd/react.production.min.js',
    'react-dom/umd/react-dom.production.min.js',
    'redux/dist/redux.min.js',
    'react-redux/dist/react-redux.min.js',
    'react-router/umd/react-router.min.js',
    'react-router-dom/umd/react-router-dom.min.js',
    'react-router-config/umd/react-router-config.min.js',
    'redux-saga/dist/redux-saga.umd.min.js',
    'redux-saga/dist/redux-saga-effects.umd.min.js',
    'redux-thunk/dist/redux-thunk.min.js',
  ],
});
