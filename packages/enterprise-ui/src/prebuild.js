const path = require('path');
const getWorkspaces = require('../config/getWorkspaces');
const paths = require('../config/paths');
const build = require('../utils/build');
const tsCompiler = require('../utils/tsCompiler');

const workspaces = getWorkspaces(paths.appPackageJson);

console.log('workspaces', workspaces);

workspaces.forEach((w) => {
  const packageJson = require(path.join(w.packagePath, 'package.json'));
  const getWebpackConfig = require(path.join(w.packagePath, 'webpack.config.js'));
  const webpackConfig = getWebpackConfig(null, { mode: 'production' });

  const { types } = packageJson;

  const {
    output: { path: appBuild },
  } = webpackConfig;

  if (types) {
    tsCompiler(path.join(w.packagePath, 'tsconfig.json'));
  }

  build(webpackConfig, {
    appBuild,
  }).then(() => console.log('done'));
});
