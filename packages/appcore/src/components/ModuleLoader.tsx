import React from 'react';

import { useStore } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

import { IApplicationConfig, IModule, IRoute } from '../Models';
import injectReducer from '../store/utils/injectReducer';
import injectSaga from '../store/utils/injectSaga';

interface IOwnProps {
  appConfig: IApplicationConfig;
}

const loadModule = (path: string): Promise<IModule> => import(/* webpackIgnore: true */ path);

const ModuleLoader: React.FunctionComponent<IOwnProps & RouteComponentProps> = ({
  appConfig,
  location,
}) => {
  const [routesConfig, setRoutes] = React.useState<IRoute[]>([]);

  const store = useStore();

  React.useEffect(() => {
    async function load() {
      const target = appConfig[location.pathname];

      if (target) {
        const { entryName, injectedReducerKey, injectedSagaKey, publicPath } = target;
        const { reducer, routes, saga } = await loadModule(`${publicPath}/${entryName}.js`);

        injectReducer(store, injectedReducerKey, reducer);
        injectSaga(store, injectedSagaKey, { saga });

        setRoutes(routes);
      } else {
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

export { loadModule, ModuleLoaderRouter as ModuleLoader };
