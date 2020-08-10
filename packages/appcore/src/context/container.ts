import { Container as InversifyContainer, interfaces } from 'inversify';

class DIContainer extends InversifyContainer {
  public addSingleton<T>(constructor: any, id: symbol): interfaces.BindingWhenOnSyntax<T> {
    console.log('addSingleton', id);
    return super.bind<T>(id).to(constructor).inSingletonScope();
  }
}

let container: DIContainer;

export function getContainer(): DIContainer {
  console.log('getContainer', container);
  return container;
}

export function setContainer(options?: interfaces.ContainerOptions): DIContainer {
  console.log('setContainer', options);
  return (container = new DIContainer(options));
}
