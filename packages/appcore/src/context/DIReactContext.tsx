import React from 'react';

import { IDIContainer } from './container';

interface IDIContext {
  container?: IDIContainer;
}

export const DIContext = React.createContext<IDIContext>({});

export const useDIContext = (): IDIContainer | undefined => {
  const {container} = React.useContext<IDIContext>(DIContext);

  return container;
};

export function useInject<T>(id: symbol): [T] | [] {
  const container = useDIContext();

  return container ? [container.get<T>(id)] : [];
}
