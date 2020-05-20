const path = require('path')
const { createWebpackDevConfig, ESLINT_MODES, whenTest } = require('@craco/craco')

const webpackConfigPath = 'react-scripts/config/webpack.config.js'
const webpackDevServerConfigPath = 'react-scripts/config/webpackDevServer.config.js'

config = {
  babel: {
    plugins: [
      // mobx
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      // styled-components
      [
        'babel-plugin-styled-components',
        whenTest(() => ({
          ssr: false,
          displayName: false,
        })),
      ]
    ]
  }
}

const { modules, devServer, ...appConfig } = require(path.join(process.cwd() + '/enterprise-ui.config'))
const webpackConfig = createWebpackDevConfig({...config, ...appConfig})

var originalWebpackConfigModule = require.cache[require.resolve(webpackConfigPath)]
if (originalWebpackConfigModule) {
   originalWebpackConfigModule.exports = (env) => webpackConfig
}

require(webpackDevServerConfigPath)
var originalDevServerModule = require.cache[require.resolve(webpackDevServerConfigPath)]
if (originalDevServerModule) {
  var originalDevServer = originalDevServerModule.exports
  originalDevServerModule.exports = (proxy, allowedHost) => ({...originalDevServer(proxy, allowedHost), ...devServer})
}

require('react-scripts/scripts/start')
