import { Container as InversifyContainer, interfaces } from 'inversify';

import { API,IAPI } from './beans/api';

export interface IDIContainer extends interfaces.Container {
  addSingleton<T>(constructor: any, id: symbol): interfaces.BindingWhenOnSyntax<T>;
}

class DIContainer extends InversifyContainer implements IDIContainer {
  /**
   * @inheritdoc
   */
  public addSingleton<T>(constructor: any, id: symbol): interfaces.BindingWhenOnSyntax<T> {
    return super.bind<T>(id).to(constructor).inSingletonScope();
  }
}

export const createDIFactory = (api: { new (): IAPI }): IDIContainer => {
  const container = new DIContainer();

  container.addSingleton<IAPI>(api, API);

  return container;
}
