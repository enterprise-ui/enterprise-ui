import { getContext, GetContextEffect } from 'redux-saga/effects';

import { DI_SAGA_CONTAINER_KEY } from './consts';
import { IDIContainer } from './container';

export function* useDIInject<T>(id: symbol): Generator<GetContextEffect, T, IDIContainer> {
  const container: IDIContainer = yield getContext(DI_SAGA_CONTAINER_KEY);

  return container.get<T>(id);
}
