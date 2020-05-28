import { Reducer, Store } from 'redux';
import { Saga, Task } from 'redux-saga';

export interface ISagaDescriptor {
  task?: Task;
  saga: Saga;
}

export interface IReducerMap {
  [key: string]: Reducer;
}

interface ISagaMap {
  [key: string]: ISagaDescriptor;
}

export interface IStore extends Store {
  closeSagas?: any;
  injectedReducers?: IReducerMap;
  injectedSagas?: ISagaMap;
  rootTask?: Task;
  runSaga?: any;
  sagaTask?: Task;
}

export interface IState {}
