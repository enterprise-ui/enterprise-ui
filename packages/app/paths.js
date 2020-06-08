const fs = require('fs');
const path = require('path');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = ['js', 'ts', 'tsx', 'json', 'jsx'];
const packageDependencies = [].map((p) => resolveApp(`../${p}/build`));

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL,
);

module.exports = {
  appBuild: resolveApp('build'),
  appHtml: resolveApp('public/index.html'),
  appNodeModules: resolveApp('../../node_modules'),
  appSrcClient: resolveApp('src/client'),
  appSrcServer: resolveApp('src/server'),
  moduleFileExtensions,
  packageDependencies,
  packageNodeModules: resolveApp('./node_modules'),
  publicUrlOrPath,
};
