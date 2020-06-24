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

module.exports = function getWorkspaces(from, excludes = []) {
  const root = findRoot(from, (dir) => {
    const pkg = path.join(dir, 'package.json');
    return fs.existsSync(pkg) && getPackages(require(pkg)) !== null;
  });

  const packages = getPackages(require(path.join(root, 'package.json')));
  const excludePatterns = excludes.map((name) => path.join(root, name));

  const workspaces = flatten(
    packages.map((workspace) => {
      const paths = glob.sync(path.join(root, workspace), { ignore: excludePatterns });

      const result = paths.map((packagePath) => {
        const packageJson = require(path.join(packagePath, 'package.json'));

        const { name, mainsrc, module } = packageJson;

        return {
          name,
          mainsrc,
          module,
          packagePath,
        };
      });

      return result.filter(({mainsrc, module}) => !!(mainsrc && module));
    }),
  );

  console.log('workspaces', workspaces);

  return workspaces;
};
