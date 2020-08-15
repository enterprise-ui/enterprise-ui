const findRoot = require('find-root');
const flatten = require('flatten');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

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

      console.log('workspace', workspace);
      console.log('paths', paths);

      const projectModules = paths
        .map((packagePath) => {
          const packageJsonPath = path.join(packagePath, 'package.json');

          if (fs.existsSync(packageJsonPath)) {
            const packageJson = require(packageJsonPath);

            return { ...getPackageParams(packageJson, includesModules, mode), packagePath };
          }

          return null;
        })
        .filter((config) => config);

      console.log('projectModules', projectModules);

      const notFoundModules = includesModules.filter(
        (name) => !projectModules.find(({ packageName }) => packageName === name),
      );

      const nodeModules = notFoundModules
        .map((moduleName) => {
          const packagePath = require.resolve(moduleName);
          const packageJson = require(path.join(moduleName, 'package.json'));

          return { ...getPackageParams(packageJson, includesModules, mode), packagePath };
        })
        .filter((config) => config);

      console.log('nodeModules', nodeModules);

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
    const { hot, key, mainsrc, nls, publicPath } = params || {};

    return {
      key,
      mainsrc,
      nls,
      packageName,
      publicPath,
      useSrc: mode !== 'production' && hot,
    };
  }

  return null;
}
