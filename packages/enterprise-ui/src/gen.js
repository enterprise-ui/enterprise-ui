const args = process.argv.slice(2);
const modeIndex = args.findIndex((x) => x === '--mode');
const mode = modeIndex === -1 ? 'production' : args[modeIndex + 1];

process.env.NODE_ENV = mode;

const yeoman = require('yeoman-environment');
const getWorkspaces = require('../config/getWorkspaces');
const rootPaths = require('../config/paths');

const workspaces = getWorkspaces(rootPaths.rootPackageJson, ['packages/*']);

const { paths } = require(rootPaths.appConfig);

const moduleLoaderConfigSrc = paths.appSrc;

const env = yeoman.createEnv();

console.log('Generate with mode', mode);

env.lookup(() => {
  env.run(['config', workspaces, moduleLoaderConfigSrc, mode], { force: true }, (err) => {
    if (!err) {
      console.log('done');
    } else {
      console.log('err', err);
    }
  });
});
