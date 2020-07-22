// @generator
module.exports = {
  '/films': {
    injectedReducerKey: 'films',
    injectedSagaKey: 'films',
    loadModule: () => import('@enterprise-ui/films'),
    useSrc: true,
  },
  '/news': {
    injectedReducerKey: 'news',
    injectedSagaKey: 'news',
    loadModule: () => import(/* webpackIgnore: true */ '/news/bundle.js'),
    moduleName: 'news',
  },
};
