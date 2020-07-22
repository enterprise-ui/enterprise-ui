const fs = require('fs-extra');
const { checkBrowsers: browsersHelper } = require('react-dev-utils/browsersHelper');
const chalk = require('react-dev-utils/chalk');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const createFile = require('./createFile');
const build = require('./build');

const measureFileSizesBeforeBuild = FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;

const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const isInteractive = process.stdout.isTTY;

const checkBrowsers = (
  webpackConfig,
  {
    appBuild,
    appHtml,
    appPackageJson,
    appPath,
    appPublic,
    copyPublic,
    platforms,
    publicUrl,
    useYarn,
    vendors = [],
  },
) =>
  browsersHelper(appPath, isInteractive)
    .then(() => {
      // First, read the current file sizes in build directory.
      // This lets us display how much they changed later.
      return measureFileSizesBeforeBuild(appBuild);
    })
    .then((previousFileSizes) => {
      // Remove all content but keep the directory so that
      // if you're in it, you don't end up in Trash
      fs.emptyDirSync(appBuild);
      // Merge with the public folder
      if (copyPublic) {
        createFile(appPath, 'public/platform', 'platform.production.min.js', platforms);
        createFile(appPath, 'public/vendors', 'vendors.production.min.js', vendors);
        copyPublicFolder({ appBuild, appHtml, appPublic });
      }
      // Start the webpack build
      return build(webpackConfig, { appBuild, previousFileSizes });
    })
    .then(
      ({ stats, previousFileSizes, warnings }) => {
        if (warnings.length) {
          console.log(chalk.yellow('Compiled with warnings.\n'));
          console.log(warnings.join('\n\n'));
          console.log(
            '\nSearch for the ' +
              chalk.underline(chalk.yellow('keywords')) +
              ' to learn more about each warning.',
          );
          console.log(
            'To ignore, add ' +
              chalk.cyan('// eslint-disable-next-line') +
              ' to the line before.\n',
          );
        } else {
          console.log(chalk.green('Compiled successfully.\n'));
        }

        console.log('File sizes after gzip:\n');
        printFileSizesAfterBuild(
          stats,
          previousFileSizes,
          appBuild,
          WARN_AFTER_BUNDLE_GZIP_SIZE,
          WARN_AFTER_CHUNK_GZIP_SIZE,
        );
        console.log();

        const appPackage = require(appPackageJson);
        const publicPath = webpackConfig.output.publicPath;
        printHostingInstructions(appPackage, publicUrl, publicPath, appBuild, useYarn);
      },
      (err) => {
        const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
        if (tscCompileOnError) {
          console.log(
            chalk.yellow(
              'Compiled with the following type errors (you may want to check these before deploying your app):\n',
            ),
          );
          printBuildError(err);
        } else {
          console.log(chalk.red('Failed to compile.\n'));
          printBuildError(err);
          process.exit(1);
        }
      },
    )
    .catch((err) => {
      if (err && err.message) {
        console.log(err.message);
      }
      process.exit(1);
    });

function copyPublicFolder({ appBuild, appHtml, appPublic }) {
  fs.copySync(appPublic, appBuild, {
    dereference: true,
    filter: (file) => file !== appHtml,
  });
}

module.exports = checkBrowsers;
