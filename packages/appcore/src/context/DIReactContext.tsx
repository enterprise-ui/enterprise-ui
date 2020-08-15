import React from 'react';

import { createDIFactory, IDIContainer } from './container';

interface IDIContext {
  container: IDIContainer;
}

export const DIContext = React.createContext<IDIContext>({
  container: createDIFactory()
});

export const useDIContext = (): IDIContainer => {
  const {container} = React.useContext<IDIContext>(DIContext);

  return container;
};

export function useInject<T>(id: symbol): [T] {
  const container = useDIContext();

  return [container.get<T>(id)];
}
