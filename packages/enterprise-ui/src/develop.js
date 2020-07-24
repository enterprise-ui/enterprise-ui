process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.on('unhandledRejection', (err) => {
  throw err;
});

require('react-scripts/config/env');

const verifyPackageTree = require('react-scripts/scripts/utils/verifyPackageTree');

if (process.env.SKIP_PREFLIGHT_CHECK !== 'true') {
  verifyPackageTree();
}

const verifyTypeScriptSetup = require('react-scripts/scripts/utils/verifyTypeScriptSetup');

verifyTypeScriptSetup();

const fs = require('fs');
const chalk = require('react-dev-utils/chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { checkBrowsers } = require('react-dev-utils/browsersHelper');
const clearConsole = require('react-dev-utils/clearConsole');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} = require('react-dev-utils/WebpackDevServerUtils');
const openBrowser = require('react-dev-utils/openBrowser');
const getWorkspaces = require('../config/getWorkspaces');
const getBundles = require('../config/getBundles');
const rootPaths = require('../config/paths');
const createFile = require('../utils/createFile');

const { configFactory, createDevServerConfig, packages, paths } = require(rootPaths.appConfig);

const useYarn = fs.existsSync(paths.yarnLockFile);
const isInteractive = process.stdout.isTTY;

if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

const DEFAULT_PORT = parseInt(process.env.PORT, 10) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST),
      )}`,
    ),
  );
  console.log(`If this was unintentional, check that you haven't mistakenly set it in your shell.`);
  console.log(`Learn more here: ${chalk.yellow('https://cra.link/advanced-config')}`);
  console.log();
}

async function develop() {
  const {platformList, vendorList} = await getBundles();

  checkBrowsers(rootPaths.appPath, isInteractive)
    .then(() => {
      return choosePort(HOST, DEFAULT_PORT);
    })
    .then((port) => {
      if (port == null) {
        return;
      }

      const workspaces = getWorkspaces(rootPaths.rootPackageJson, packages, 'development');
      const config = configFactory.configure('development', true, workspaces);
      const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
      const appName = require(paths.appPackageJson).name;
      const useTypeScript = fs.existsSync(paths.appTsConfig);
      const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
      const urls = prepareUrls(protocol, HOST, port, paths.publicUrlOrPath.slice(0, -1));
      const devSocket = {
        warnings: (warnings) => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
        errors: (errors) => devServer.sockWrite(devServer.sockets, 'errors', errors),
      };

      createFile(rootPaths.appPath, 'public/platform', 'platform.production.min.js', platformList);
      createFile(rootPaths.appPath, 'public/vendors', 'vendors.production.min.js', vendorList);

      const compiler = createCompiler({
        appName,
        config,
        devSocket,
        urls,
        useYarn,
        useTypeScript,
        tscCompileOnError,
        webpack,
      });

      const proxySetting = require(paths.appPackageJson).proxy;
      const proxyConfig = prepareProxy(proxySetting, paths.appPublic, paths.publicUrlOrPath);

      const serverConfig = createDevServerConfig.configure(proxyConfig, urls.lanUrlForConfig);
      const devServer = new WebpackDevServer(compiler, serverConfig);

      devServer.listen(port, HOST, (err) => {
        if (err) {
          return console.log(err);
        }
        if (isInteractive) {
          clearConsole();
        }

        console.log(chalk.cyan('Starting the development server...\n'));
        openBrowser(urls.localUrlForBrowser);
      });

      ['SIGINT', 'SIGTERM'].forEach(function (sig) {
        process.on(sig, function () {
          devServer.close();
          process.exit();
        });
      });

      if (process.env.CI !== 'true') {
        process.stdin.on('end', function () {
          devServer.close();
          process.exit();
        });
      }
    })
    .catch((err) => {
      if (err && err.message) {
        console.log(err.message);
      }
      process.exit(1);
    });
}

develop();
