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
  modules: require('./src/config'),
  paths: require('./config/paths'),
});
