import { getContainer } from './container';

export function useInject<T>(id: symbol): [T] {
  console.log('useInject', id);
  return [getContainer().get<T>(id)];
}
