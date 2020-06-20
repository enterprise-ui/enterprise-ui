// @generator
module.exports = {
  '/news': {
    injectedReducerKey: 'news',
    injectedSagaKey: 'news',
    loadModule: () => import('@enterprise-ui/news'), // Генерить только при сборке development
    loadStatic: () => import(/* webpackIgnore: true */ '/news/news.js'), // Генерить только при сборке production
    moduleName: 'news',
  },
};
