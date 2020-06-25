process.env.NODE_ENV = 'production';

const yeoman = require('yeoman-environment');
const getWorkspaces = require('../config/getWorkspaces');
const rootPaths = require('../config/paths');

const workspaces = getWorkspaces(rootPaths.rootPackageJson, ['packages/*']);

const { paths } = require(rootPaths.appConfig);

const moduleLoaderConfigSrc = paths.appSrc;

const env = yeoman.createEnv();

env.lookup(() => {
  env.run(['config', workspaces, moduleLoaderConfigSrc], {force: true}, (err) => {
    if (!err) {
      console.log('done');
    } else {
      console.log('err', err);
    }
  });
});
