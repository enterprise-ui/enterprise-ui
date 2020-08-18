import React from 'react';

import { RouteComponentProps, withRouter } from 'react-router-dom';

import { IApplicationConfig } from '../Models';
import { renderRoutes } from '../router/renderRoutes';
import { IStore } from '../store/Models';

import { ModuleLoader } from './ModuleLoader';

interface IOwnProps {
  appConfig: IApplicationConfig;
  store: IStore;
}

const ModuleRouter: React.FunctionComponent<IOwnProps & RouteComponentProps> = ({ appConfig, store }) => {
  const paths = Object.keys(appConfig);

  const routes = paths.map((path) => ({
    render: (props: RouteComponentProps) => <ModuleLoader {...props} config={appConfig[path]} store={store} />,
    path: path + '/*',
  }));

  console.log('ModuleRouter.render');

  return renderRoutes(routes);
};

ModuleRouter.displayName = 'ModuleRouter';

const ModuleRouterEnhanced = withRouter(ModuleRouter);

export { ModuleRouterEnhanced as ModuleRouter };
