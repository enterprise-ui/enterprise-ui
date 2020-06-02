import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import { IReducerMap, IState, IStore } from './Models';

export const createReducer = (injectedReducers: IReducerMap = {}) =>
  combineReducers({
    ...injectedReducers,
  });

export default (reducer: Reducer, middlewares = [], initialState: IState = {}): IStore => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewaresToApply = [sagaMiddleware, thunkMiddleware, ...middlewares];

  console.log('createStore start');

  const store: IStore = createStore(reducer, initialState, applyMiddleware(...middlewaresToApply));

  console.log('createStore end');

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = { root: reducer };
  store.injectedSagas = {};

  return store;
};
