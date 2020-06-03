import React from 'react';

import {
  IApplicationConfig,
  injectReducer,
  injectSaga,
  IRoute,
  IStore,
} from '@enterprise-ui/appcore';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { renderRoutes } from '../renderRoutes';

interface IOwnProps {
  appConfig: IApplicationConfig;
  store: IStore;
}

const ModuleLoader: React.FunctionComponent<IOwnProps & RouteComponentProps> = ({
  appConfig,
  location,
  store,
}) => {
  const [routesConfig, setRoutes] = React.useState<IRoute[]>([]);

  React.useEffect(() => {
    async function load() {
      console.log('load config');

      const target = appConfig[location.pathname];

      console.log(target);

      if (target) {
        console.log('unpackage config');
        const { entryName, injectedReducerKey, injectedSagaKey, publicPath } = target;
        console.log(entryName);
        console.log(injectedReducerKey);
        console.log(injectedSagaKey);
        console.log(publicPath);
        const path = `${publicPath}/${entryName}.js`;
        console.log('load module', path);
        const module = await import(/* webpackIgnore: true */path);

        console.log(module);

        const { reducer, routes, saga } = module;

        console.log(reducer);
        console.log(routes);
        console.log(saga);

        console.log('inject reducer');
        injectReducer(store, injectedReducerKey, reducer);

        console.log('inject saga');
        injectSaga(store, injectedSagaKey, { saga });

        console.log('set routes');
        setRoutes(routes);
      } else {
        console.log('config is not found');
        setRoutes([]);
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return renderRoutes(routesConfig);
};

ModuleLoader.displayName = 'ModuleLoader';

const ModuleLoaderRouter = withRouter(ModuleLoader);

export { ModuleLoaderRouter as ModuleLoader };