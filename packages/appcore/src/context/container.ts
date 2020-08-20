import { Container as InversifyContainer, interfaces } from 'inversify';

type TConstructor<T> = {
  new (...args: any[]): T;
};

export interface IDIContainer {
  addSingleton: <T>(c: TConstructor<T>, id: symbol) => interfaces.BindingWhenOnSyntax<T>;
  get: <T>(id: symbol) => T;
}

class DIContainer extends InversifyContainer implements IDIContainer {
  /**
   * @inheritdoc
   */
  public addSingleton<T>(c: TConstructor<T>, id: symbol): interfaces.BindingWhenOnSyntax<T> {
    return super.bind<T>(id).to(c).inSingletonScope();
  }
}

export const createDIFactory = (): IDIContainer => new DIContainer();
