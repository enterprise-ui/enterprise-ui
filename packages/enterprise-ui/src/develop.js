const path = require('path')
const { createWebpackDevConfig, ESLINT_MODES, whenTest } = require('@craco/craco')

const webpackConfigPath = 'react-scripts/config/webpack.config.js'

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

const { modules, ...appConfig } = require(path.join(process.cwd() + '/enterprise-ui.config'))
const webpackConfig = createWebpackDevConfig({...config, ...appConfig})
var q = require.cache[require.resolve(webpackConfigPath)]
if (q) {
    q.exports = (env) => webpackConfig
}

require('react-scripts/scripts/start')
