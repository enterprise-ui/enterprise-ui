const apputils = require('@enterprise-ui/apputils');
const paths = require('./paths');

module.exports = (env, argv) => {
  const config = apputils.createWebpackConfig({
    entries: [paths.appSrc],
    outputPath: paths.appBuild,
    packageJsonPath: paths.packageJson,
    webpackEnv: argv.mode,
  });

  console.log('webpackConfig', config);

  return config;
};
