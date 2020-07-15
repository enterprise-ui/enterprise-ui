const path = require('path');

const resolveApp = (relativePath) => path.resolve(__dirname, relativePath);

const moduleFileExtensions = ['js', 'ts', 'tsx', 'json', 'jsx'];

module.exports = {
  appBuild: resolveApp('build'),
  appConfig: resolveApp('src/enterprise-ui.config'),
  appSrc: resolveApp('src'),
  moduleFileExtensions,
  packageJson: resolveApp('package.json'),
};
