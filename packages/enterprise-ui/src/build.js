process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const getWorkspaces = require('../config/getWorkspaces');
const rootPaths = require('../config/paths');
const checkBrowsers = require('../utils/checkBrowsers');

const { configFactory, paths } = require(rootPaths.appConfig);

const useYarn = fs.existsSync(paths.yarnLockFile);

const workspaces = getWorkspaces(paths.rootPackageJson, ['packages/*']);

const webpackConfig = configFactory.configure('production', false, workspaces);

checkBrowsers(webpackConfig, {
  appBuild: paths.appBuild,
  appHtml: paths.appHtml,
  appPackageJson: paths.appPackageJson,
  appPath: rootPaths.appPath,
  appPublic: paths.appPublic,
  copyPublic: true,
  publicUrl: paths.publicUrlOrPath,
  useYarn,
});
