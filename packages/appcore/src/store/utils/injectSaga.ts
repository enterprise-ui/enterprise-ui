import { ISagaDescriptor,IStore } from '../Models';

export default (store: IStore, key: string, descriptor: ISagaDescriptor) => {
  const { saga } = descriptor;
  const { injectedSagas = {}} = store;

  let hasSaga = injectedSagas ? Reflect.has(injectedSagas, key) : false;

  if (!hasSaga) {
    injectedSagas[key] = {
      ...descriptor,
      task: store.runSaga(saga),
    };
  }
};
