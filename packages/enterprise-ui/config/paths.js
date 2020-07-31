const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

console.log('node_modules', path.dirname(require.main.filename));

module.exports = {
  appConfig: resolveApp('./enterprise-ui.config'),
  appBuild: resolveApp('build/public'),
  appPath: resolveApp('.'),
  appPackageJson: resolveApp('package.json'),
  rootPackageJson: resolveApp('../../package.json'),
};
