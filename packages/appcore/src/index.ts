import { ModuleLoader } from './components/ModuleLoader';
import { API, IAPI, IGetRequest } from './context/beans/api';
import { createDIFactory } from './context/container';
import { DIContext, useInject } from './context/DIReactContext';
import { getService } from './context/DISagaContext';
import configureStore from './store/configureStore';
import { IStore } from './store/Models';
import injectReducer from './store/utils/injectReducer';
import injectSaga from './store/utils/injectSaga';
import InitialPropsDecorator from './InitialPropsDecorator';
import {
  IApplicationConfig,
  IContext,
  IMatchedRouteLoadable,
  IModule,
  IPackageReducerConfig,
  IReactFunctionComponent,
  IRoute,
  IStaticProps,
  TGetInitialPropsMethod,
  TReactComponentType,
  TRouteComponent,
} from './Models';
import withInitialProps from './withInitialProps';

export type {
  IAPI,
  IApplicationConfig,
  IContext,
  IGetRequest,
  IMatchedRouteLoadable,
  IModule,
  IPackageReducerConfig,
  IRoute,
  IStaticProps,
  IStore,
  TGetInitialPropsMethod,
  IReactFunctionComponent,
  TReactComponentType,
  TRouteComponent,
};

export {
  API,
  DIContext,
  InitialPropsDecorator,
  configureStore,
  createDIFactory,
  getService,
  injectReducer,
  injectSaga,
  ModuleLoader,
  useInject,
  withInitialProps,
};
