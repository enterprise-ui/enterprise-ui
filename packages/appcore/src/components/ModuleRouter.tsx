import React from 'react';

import { IApplicationConfig } from '../Models';
import { renderRoutes } from '../router/renderRoutes';

import { ModuleLoader } from './ModuleLoader';

interface IOwnProps {
  appConfig: IApplicationConfig;
}

const ModuleRouter: React.FunctionComponent<IOwnProps> = 
  ({ appConfig }) => {
    const paths = Object.keys(appConfig);

    const routes = paths.map((path) => ({
      key: path,
      path: path + '/*',
      render: () => {
        return <ModuleLoader config={appConfig[path]} />
      },
    }));

    console.log('ModuleRouter.render');

    return renderRoutes(routes);
  }

ModuleRouter.displayName = 'ModuleRouter';

export { ModuleRouter };
