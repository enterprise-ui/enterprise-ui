// @generator
module.exports = {
<%_ workspaces.forEach(function(w){ _%>
  '/<%= w.module %>': {
    injectedReducerKey: '<%= w.module %>',
    injectedSagaKey: '<%= w.module %>',
    loadModule: () => import('<%= w.name %>'),
    loadStatic: () => import(/* webpackIgnore: true */ '/<%= w.module %>/bundle.js'),
    moduleName: '<%= w.module %>',
  },
<%_ }); _%>
};
