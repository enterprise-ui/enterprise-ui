import React from 'react';

import { LoadableComponent } from '@loadable/component';
import { MatchedRoute } from 'react-router-config';
import { RouteComponentProps, RouteProps } from 'react-router-dom';
import { Reducer } from 'redux';
import { Saga } from 'redux-saga';

import { IStore } from './store/Models';

export interface IStaticProps {
  isServer?: boolean;
  isServerInitialRender?: boolean;
}

interface IRouteProps {
  queryParams?: any;
}

export interface IContext<TProps> {
  props: IStaticProps & IRouteProps & RouteComponentProps & TProps;
  store: IStore;
}

export type TGetInitialPropsMethod<TProps> = (ctx: IContext<TProps>) => Promise<IStaticProps>;

export type TReactComponentType<TProps = any> = React.ComponentType<
  TProps & RouteComponentProps
> & {
  getInitialProps?: TGetInitialPropsMethod<TProps>;
};

export interface IReactFunctionComponent<TProps>
  extends React.FunctionComponent<TProps & RouteComponentProps> {
  getInitialProps?: TGetInitialPropsMethod<TProps>;
}

export type TRouteComponent =
  | TReactComponentType<any>
  | (LoadableComponent<any> & TReactComponentType<any>);

export interface IRoute extends RouteProps {
  component?: TRouteComponent;
  routes?: IRoute[];
}

export interface IMatchedRouteLoadable extends MatchedRoute<{}> {
  route: IRoute;
}

export interface IPackageReducerConfig {
  [packageId: string]: Reducer;
}

export interface IModule {
  i18nConfig?: any;
  reducer: Reducer;
  routes: IRoute[];
  saga: Saga;
}

export interface IModuleConfig {
  injectedReducerKey: string;
  injectedSagaKey: string;
  loadModule: () => Promise<IModule>;
  moduleName?: string;
  useSrc?: boolean;
}

export interface IApplicationConfig {
  [path: string]: IModuleConfig;
}
