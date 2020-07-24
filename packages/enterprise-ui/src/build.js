process.env.NODE_ENV = 'production';

const fs = require('fs-extra');
const getWorkspaces = require('../config/getWorkspaces');
const getBundles = require('../config/getBundles');
const rootPaths = require('../config/paths');
const checkBrowsers = require('../utils/checkBrowsers');

const { configFactory, packages, paths } = require(rootPaths.appConfig);

const useYarn = fs.existsSync(paths.yarnLockFile);

const workspaces = getWorkspaces(rootPaths.rootPackageJson, packages);

const webpackConfig = configFactory.configure('production', false, workspaces);

async function build() {
  const {platformList, vendorList} = await getBundles();

  checkBrowsers(webpackConfig, {
    appBuild: paths.appBuild,
    appHtml: paths.appHtml,
    appPackageJson: paths.appPackageJson,
    appPath: rootPaths.appPath,
    appPublic: paths.appPublic,
    copyPublic: true,
    publicUrl: paths.publicUrlOrPath,
    useYarn,
    platforms: platformList,
    vendors: vendorList,
  });
}

build();
