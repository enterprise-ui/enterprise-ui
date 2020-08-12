import { applyMiddleware, combineReducers, createStore, Reducer } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';

import { DI_SAGA_CONTAINER_KEY } from '../context/consts';
import { IDIContainer } from '../context/container';

import { IReducerMap, IState, IStore } from './Models';

export const createReducer = (injectedReducers: IReducerMap = {}) =>
  combineReducers({
    ...injectedReducers,
  });

export default (
  reducer: Reducer,
  container: IDIContainer,
  middlewares = [],
  initialState: IState = {},
): IStore => {
  const sagaMiddleware = createSagaMiddleware({
    context: {
      [DI_SAGA_CONTAINER_KEY]: container,
    },
  });

  const middlewaresToApply = [sagaMiddleware, thunkMiddleware, ...middlewares];

  const store: IStore = createStore(reducer, initialState, applyMiddleware(...middlewaresToApply));

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = { root: reducer };
  store.injectedSagas = {};

  return store;
};
