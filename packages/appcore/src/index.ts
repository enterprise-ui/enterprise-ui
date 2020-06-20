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
  IApplicationConfig,
  IContext,
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
  InitialPropsDecorator,
  configureStore,
  injectReducer,
  injectSaga,
  withInitialProps,
};
