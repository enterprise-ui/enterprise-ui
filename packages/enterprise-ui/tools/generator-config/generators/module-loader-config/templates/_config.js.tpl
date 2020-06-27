// @generator
module.exports = {
<%_ workspaces.forEach(function(w){ _%>
  '/<%= w.module %>': {
    injectedReducerKey: '<%= w.module %>',
    injectedSagaKey: '<%= w.module %>',
    <%_ if (isLoadStatic) { _%>
    loadStatic: () => import(/* webpackIgnore: true */ '/<%= w.module %>/bundle.js'),
    <%_ } else { _%>
    loadModule: () => import('<%= w.name %>'),
    <%_ } _%>
    moduleName: '<%= w.module %>',
  },
<%_ }); _%>
};
