const fs = require('fs');
const path = require('path');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

const moduleFileExtensions = ['js', 'ts', 'tsx', 'json', 'jsx'];
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL,
);

module.exports = {
  appBuild: resolveApp('build/public'),
  appHtml: resolveApp('public/index.html'),
  appIndexJs: resolveModule(resolveApp, 'src/client/index'),
  appNodeModules: resolveApp('../../node_modules'),
  appPackageJson: resolveApp('package.json'),
  appPublic: resolveApp('public'),
  appSrc: resolveApp('src'),
  appSrcClient: resolveApp('src/client'),
  appSrcServer: resolveApp('src/server'),
  appTsConfig: resolveApp('tsconfig.json'),
  dotenv: resolveApp('.env'),
  moduleFileExtensions,
  packageNodeModules: resolveApp('./node_modules'),
  publicUrlOrPath,
  yarnLockFile: resolveApp('../../yarn.lock'),
};
