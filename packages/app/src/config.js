// @generator
module.exports = {
  '/news': {
    injectedReducerKey: 'news',
    injectedSagaKey: 'news',
    loadStatic: () => import(/* webpackIgnore: true */ '/news/bundle.js'),
    moduleName: 'news',
  },
};
