import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import { IReducerMap, IState, IStore } from './Models';

export const createReducer = (injectedReducers: IReducerMap = {}) =>
  combineReducers({
    ...injectedReducers,
  });

export default (reducers: IReducerMap, middlewares = [], initialState?: IState): IStore => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewaresToApply = [sagaMiddleware, thunkMiddleware, ...middlewares];

  const store: IStore = createStore(
    createReducer(reducers),
    initialState,
    applyMiddleware(...middlewaresToApply),
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = reducers;
  store.injectedSagas = {};

  return store;
};
