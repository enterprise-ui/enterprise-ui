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
const rootPaths = require('../config/paths');

const { configFactory, createDevServerConfig, paths } = require(rootPaths.appConfig);

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

const { checkBrowsers } = require('react-dev-utils/browsersHelper');
checkBrowsers(rootPaths.appPath, isInteractive)
  .then(() => {
    return choosePort(HOST, DEFAULT_PORT);
  })
  .then((port) => {
    if (port == null) {
      return;
    }

    const workspaces = getWorkspaces(paths.rootPackageJson, ['packages/*']);
    console.log('workspaces', workspaces);
    const config = configFactory.configure('development', true, workspaces);
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
    const appName = require(paths.appPackageJson).name;
    const useTypeScript = fs.existsSync(paths.appTsConfig);
    const tscCompileOnError = process.env.TSC_COMPILE_ON_ERROR === 'true';
    console.log('protocol', protocol);
    console.log('HOST', HOST);
    console.log('port', port);
    const urls = prepareUrls(protocol, HOST, port, paths.publicUrlOrPath.slice(0, -1));
    const devSocket = {
      warnings: (warnings) => devServer.sockWrite(devServer.sockets, 'warnings', warnings),
      errors: (errors) => devServer.sockWrite(devServer.sockets, 'errors', errors),
    };

    console.log('appName', appName);
    console.log('devSocket', devSocket);
    console.log('urls', urls);
    console.log('useYarn', useYarn);
    console.log('useTypeScript', useTypeScript);
    console.log('tscCompileOnError', tscCompileOnError);

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
