import { Container as InversifyContainer, interfaces } from 'inversify';

export interface IDIContainer {
  addSingleton<T>(constructor: any, id: symbol): interfaces.BindingWhenOnSyntax<T>;
  get<T>(id: symbol): T;
}

class DIContainer extends InversifyContainer implements IDIContainer {
  /**
   * @inheritdoc
   */
  public addSingleton<T>(constructor: any, id: symbol): interfaces.BindingWhenOnSyntax<T> {
    return super.bind<T>(id).to(constructor).inSingletonScope();
  }
}

export const createDIFactory = (): IDIContainer => {
  const container = new DIContainer();

  return container;
}
