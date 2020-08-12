import React from 'react';

import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { IApplicationConfig, IModule,IRoute } from '../Models';
import { renderRoutes } from '../router/renderRoutes';
import { IStore } from '../store/Models';
import injectReducer from '../store/utils/injectReducer';
import injectSaga from '../store/utils/injectSaga';

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
      const path = location.pathname.replace(/\/+$/, '');

      const target = appConfig[path];

      console.log(target);

      if (target) {
        console.log('unpackage config');
        const { injectedReducerKey, injectedSagaKey, loadModule, moduleName, useSrc } = target;
        let module: IModule;

        if (useSrc) {
          module = await loadModule();
        } else {
          await loadModule();
          module = moduleName ? window[moduleName] : null;
        }

        const { reducer, routes, saga } = module;

        console.log('reducer', reducer);
        console.log('routes', routes);
        console.log('saga', saga);

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
