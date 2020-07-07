const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = ['js', 'ts', 'tsx', 'json', 'jsx'];

module.exports = {
  appBuild: resolveApp('build'),
  appNodeModules: resolveApp('../../node_modules'),
  appSrc: resolveApp('src'),
  moduleFileExtensions,
  packageJson: resolveApp('package.json'),
  packageNodeModules: resolveApp('./node_modules'),
};
