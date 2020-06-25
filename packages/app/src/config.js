// @generator
module.exports = {
  '/news': {
    injectedReducerKey: 'news',
    injectedSagaKey: 'news',
    loadModule: () => import('@enterprise-ui/news'),
    loadStatic: () => import(/* webpackIgnore: true */ '/news/bundle.js'),
    moduleName: 'news',
  },
};
