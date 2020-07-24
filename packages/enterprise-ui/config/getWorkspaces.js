const findRoot = require('find-root');
const flatten = require('flatten');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const rootPaths = require('./paths');

function getPackages(packageJson) {
  if (!('workspaces' in packageJson)) {
    return null;
  }
  const { workspaces } = packageJson;

  if (Array.isArray(workspaces)) {
    return workspaces;
  }

  return workspaces.packages || null;
}

module.exports = function getWorkspaces(from, includesModules = [], mode = 'production') {
  const root = findRoot(from, (dir) => {
    console.log('dir', dir);
    const pkg = path.join(dir, 'package.json');
    return fs.existsSync(pkg) && getPackages(require(pkg)) !== null;
  });

  const packages = getPackages(require(path.join(root, 'package.json')));

  const workspaces = flatten(
    packages.map((workspace) => {
      const paths = glob.sync(path.join(root, workspace));

      const projectModules = paths
        .map((packagePath) => {
          const packageJson = require(path.join(packagePath, 'package.json'));

          return { ...getPackageParams(packageJson, includesModules, mode), packagePath };
        })
        .filter((config) => config);

      const notFoundModules = includesModules.filter(
        (name) => !projectModules.find(({ packageName }) => packageName === name),
      );

      console.log('notFoundModules', notFoundModules);

      const nodeModules = notFoundModules
        .map((moduleName) => {
          const packagePath = path.join(rootPaths.rootNodeModules, moduleName);
          const packageJson = require(path.join(packagePath, 'package.json'));

          return { ...getPackageParams(packageJson, includesModules, mode), packagePath };
        })
        .filter((config) => config);

      return [...projectModules, ...nodeModules];
    }),
  ).filter((w) => w.key);

  console.log('workspaces', workspaces);

  return workspaces;
};

function getPackageParams(packageJson, includesModules, mode) {
  const { name: packageName } = packageJson;
  const include = includesModules.indexOf(packageName) !== -1;

  const params = packageJson['enterprise-ui'];

  if (include && params) {
    const { hot, key, mainsrc, publicPath } = params || {};

    return {
      key,
      mainsrc,
      packageName,
      publicPath,
      useSrc: mode !== 'production' && hot,
    };
  }

  return null;
}
