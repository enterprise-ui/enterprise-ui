const path = require('path');
const getWorkspaces = require('../config/getWorkspaces');
const paths = require('../config/paths');
const build = require('../utils/build');

const platforms = getWorkspaces(paths.appPackageJson, ['examples/**/packages/*']);
const domains = getWorkspaces(paths.appPackageJson, ['packages/*']);

console.log('platforms', platforms);
console.log('domains', domains);

async function run() {
  await Promise.all(prebuild(platforms));
  prebuild(domains);
}

function prebuild(workspaces) {
  const promises = workspaces.map((w) => {
    const getWebpackConfig = require(path.join(w.packagePath, 'webpack.config.js'));
    const webpackConfig = getWebpackConfig(null, { mode: 'production' });

    const {
      output: { path: appBuild },
    } = webpackConfig;

    return build(webpackConfig, {
      appBuild,
    });
  });

  return promises;
}

run();
