import { Container as InversifyContainer, interfaces } from 'inversify';

type TConstructor<T> = {
  new (...args: any[]): T;
};

interface IDIContainer {
  addSingleton: <T>(
    c: TConstructor<T>,
    id: symbol,
    props?: any,
  ) => interfaces.BindingWhenOnSyntax<T>;
  get: <T>(id: symbol) => T;
  preloadAll: (ids: symbol[]) => Promise<any>;
}

interface IDIContainerPreloadable {
  preload: () => Promise<any>;
}

type Provider<T> = () => Promise<T>;

const getProviderId = (id: symbol) => Symbol.for(`Provider<${id.toString()}>`);

class DIContainer extends InversifyContainer implements IDIContainer {
  /**
   * @inheritdoc
   */
  public addSingleton<T>(
    c: TConstructor<T>,
    id: symbol,
    props?: any,
  ): interfaces.BindingWhenOnSyntax<T> {
    if (props) {
      return super
        .bind<T>(id)
        .toDynamicValue(() => new c(props))
        .inSingletonScope();
    }

    return super.bind<T>(id).to(c).inSingletonScope();
  }

  /**
   * @inheritdoc
   */
  public preloadAll(ids: symbol[]): Promise<any> {
    const providers = ids.map((id) => {
      this.addProvider(id);

      return super.get<Provider<IDIContainerPreloadable>>(getProviderId(id));
    });

    const promises = providers.map(async (provider) => {
      return await provider();
    });

    return Promise.all(promises);
  }

  private addProvider(
    id: symbol,
  ): interfaces.BindingWhenOnSyntax<Provider<IDIContainerPreloadable>> {
    return super
      .bind<Provider<IDIContainerPreloadable>>(getProviderId(id))
      .toProvider<IDIContainerPreloadable>((context) => {
        return () => {
          return new Promise<IDIContainerPreloadable>((resolve, reject) => {
            const bean = context.container.get<IDIContainerPreloadable>(id);

            bean
              .preload()
              .then(() => {
                resolve(bean);
              })
              .catch((e: Error) => {
                reject(e);
              });
          });
        };
      });
  }
}

export type { IDIContainer, IDIContainerPreloadable };

export const createDIFactory = (): IDIContainer => new DIContainer();
