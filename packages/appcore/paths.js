const path = require('path');

const resolveApp = (relativePath) => path.resolve(__dirname, relativePath);

const moduleFileExtensions = ['js', 'ts', 'tsx', 'json', 'jsx'];

module.exports = {
  appBuild: resolveApp('build'),
  appNodeModules: resolveApp('../../node_modules'),
  appSrc: resolveApp('src'),
  moduleFileExtensions,
  packageJson: resolveApp('package.json'),
  packageNodeModules: resolveApp('./node_modules'),
};
