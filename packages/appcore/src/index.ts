import { ModuleRouter } from './components/ModuleRouter';
import { API, IAPI, IGetRequest } from './context/beans/api';
import { I18N, II18N } from './context/beans/i18n';
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
import { makePath } from './Utils';
import withInitialProps from './withInitialProps';

export type {
  IAPI,
  IApplicationConfig,
  IContext,
  IGetRequest,
  II18N,
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
  I18N,
  InitialPropsDecorator,
  configureStore,
  createDIFactory,
  getService,
  injectReducer,
  injectSaga,
  makePath,
  ModuleRouter,
  useInject,
  withInitialProps,
};
