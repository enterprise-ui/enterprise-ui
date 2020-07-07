// @generator
module.exports = {
  '/films': {
    injectedReducerKey: 'films',
    injectedSagaKey: 'films',
    loadModule: () => import(/* webpackIgnore: true */ '/films/bundle.js'),
    moduleName: 'films',
  },
  '/news': {
    injectedReducerKey: 'news',
    injectedSagaKey: 'news',
    loadModule: () => import(/* webpackIgnore: true */ '/news/bundle.js'),
    moduleName: 'news',
  },
};
