// @generator
module.exports = {
  '/films': {
    injectedReducerKey: 'films',
    injectedSagaKey: 'films',
    isStatic: true,
    loadModule: () => import(/* webpackIgnore: true */ '/films/bundle.js'),
    moduleName: 'films',
  },
  '/news': {
    injectedReducerKey: 'news',
    injectedSagaKey: 'news',
    isStatic: true,
    loadModule: () => import(/* webpackIgnore: true */ '/news/bundle.js'),
    moduleName: 'news',
  },
};
