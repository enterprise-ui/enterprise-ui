// @generator
module.exports = {
<%_ workspaces.forEach(function(w){ _%>
  '/<%= w.key %>': {
    injectedReducerKey: '<%= w.key %>',
    injectedSagaKey: '<%= w.key %>',
    <%_ if (w.useSrc) { _%>
    loadModule: () => import('<%= w.packageName %>'),
    useSrc: <%= w.useSrc %>,
    <%_ } else { _%>
    loadModule: () => import(/* webpackIgnore: true */ '<%= w.publicPath %>/bundle.js'),
    moduleName: '<%= w.key %>',
    <%_ } _%>
  },
<%_ }); _%>
};
