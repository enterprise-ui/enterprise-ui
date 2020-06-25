const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  appConfig: resolveApp('./enterprise-ui.config'),
  appBuild: resolveApp('build/public'),
  appPath: resolveApp('.'),
  rootPackageJson: resolveApp('../../package.json'),
};
