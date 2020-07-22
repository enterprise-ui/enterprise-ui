const apputils = require('@enterprise-ui/apputils');
const paths = require('./paths');

module.exports = (env, argv) => {
  const config = apputils.createWebpackConfig({
    appPath: paths.appPath,
    entries: [paths.appSrc],
    outputPath: paths.appBuild,
    packageJsonPath: paths.packageJson,
    webpackEnv: argv.mode,
    withDts: true,
  });

  console.log('webpackConfig', config);

  return config;
};
