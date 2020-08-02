const args = process.argv.slice(2);
const modeIndex = args.findIndex((x) => x === '--mode');
const mode = modeIndex === -1 ? 'production' : args[modeIndex + 1];

process.env.NODE_ENV = mode;

const _ = require('lodash');
const getWorkspaces = require('../config/getWorkspaces');
const rootPaths = require('../config/paths');
const createFile = require('../utils/createFile');

const { packages } = require(rootPaths.appConfig);

const workspaces = getWorkspaces(rootPaths.rootPackageJson, packages, mode);

const { paths } = require(rootPaths.appConfig);

const moduleLoaderConfigSrc = paths.appSrc;

console.log('Generate with mode', mode);

const tepmlate = _.template(`
// @generator
module.exports = {
<% workspaces.forEach(function(w){ %>
  '/<%= w.key %>': {
    injectedReducerKey: '<%= w.key %>',
    injectedSagaKey: '<%= w.key %>',
    <% if (w.useSrc) { %>
    loadModule: () => import('<%= w.packageName %>'),
    useSrc: <%= w.useSrc %>,
    <% } else { %>
    loadModule: () => import(/* webpackIgnore: true */ '<%= w.publicPath %>/bundle.js'),
    moduleName: '<%= w.key %>',
    <% } %>
  },
<% }); %>
};`);

createFile(moduleLoaderConfigSrc, '', 'config.js', [tepmlate({workspaces})]);
