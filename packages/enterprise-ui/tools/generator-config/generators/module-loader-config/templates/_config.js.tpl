// @generator
module.exports = {
<%_ workspaces.forEach(function(w){ _%>
  '/<%= w.key %>': {
    injectedReducerKey: '<%= w.key %>',
    injectedSagaKey: '<%= w.key %>',
    isStatic: <%= w.isStatic %>,
    <%_ if (w.isStatic) { _%>
    loadModule: () => import(/* webpackIgnore: true */ '<%= w.publicPath %>/bundle.js'),
    moduleName: '<%= w.key %>',
    <%_ } else { _%>
    loadModule: () => import('<%= w.packageName %>'),
    <%_ } _%>
  },
<%_ }); _%>
};
