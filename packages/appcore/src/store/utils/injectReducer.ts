import { Reducer } from 'redux';

import { createReducer } from '../configureStore';
import { IStore } from '../Models';

export default (store: IStore, key: string, reducer: Reducer) => {
  const { injectedReducers = {}} = store;

  const hasReducer = injectedReducers
    ? Reflect.has(injectedReducers, key) && injectedReducers[key] === reducer
    : false;

  if (!hasReducer) {
    injectedReducers[key] = reducer;
    store.replaceReducer(createReducer(store.injectedReducers));
  }
};
