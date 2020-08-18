import { Container as InversifyContainer, interfaces } from 'inversify';

export interface IDIContainer {
  addSingleton: <T>(constructor: any, id: symbol) => interfaces.BindingWhenOnSyntax<T>;
  addDynamic: <T>(constructor: any, props: any, id: symbol) => interfaces.BindingWhenOnSyntax<T>;
  get: <T>(id: symbol) => T;
}

class DIContainer extends InversifyContainer implements IDIContainer {
  /**
   * @inheritdoc
   */
  public addSingleton<T>(constructor: any, id: symbol): interfaces.BindingWhenOnSyntax<T> {
    return super.bind<T>(id).to(constructor).inSingletonScope();
  }

  /**
   * @inheritdoc
   */
  public addDynamic<T>(constructor: any, props: any, id: symbol): interfaces.BindingWhenOnSyntax<T> {
    return super.bind<T>(id).toDynamicValue(() => new constructor(props));
  }
}

export const createDIFactory = (): IDIContainer => {
  const container = new DIContainer();

  return container;
}
