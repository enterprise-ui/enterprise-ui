const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const resolveDir = (relativePath) => path.resolve(__dirname, relativePath);

module.exports = {
  appConfig: resolveApp('./enterprise-ui.config'),
  appBuild: resolveApp('build/public'),
  appPath: resolveApp('.'),
  appPackageJson: resolveApp('package.json'),
  rootNodeModules: resolveDir('../../../node_modules'),
  rootPackageJson: resolveApp('../../package.json'),
};
