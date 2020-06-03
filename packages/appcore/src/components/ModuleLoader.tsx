import React from 'react';

import { RouteComponentProps } from 'react-router';

import { IApplicationConfig, IRoute } from '../Models';
import { IStore } from '../store/Models';
import injectReducer from '../store/utils/injectReducer';
import injectSaga from '../store/utils/injectSaga';

interface IOwnProps {
  appConfig: IApplicationConfig;
  renderRoutes: (routes: IRoute[]) => JSX.Element,
  store: IStore;
}

const loadModule = (path: string): Promise<any> => import(/* webpackIgnore: true */ path);

const ModuleLoader: React.FunctionComponent<IOwnProps & RouteComponentProps> = ({
  appConfig,
  location,
  renderRoutes,
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
        console.log('load module');
        const { reducer, routes, saga } = await loadModule(`${publicPath}/${entryName}.js`);

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

export { loadModule, ModuleLoader };
