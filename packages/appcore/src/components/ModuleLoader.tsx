import React from 'react';

import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { IApplicationConfig, IModule, IRoute } from '../Models';
import { renderRoutes } from '../router/renderRoutes';
import { IStore } from '../store/Models';
import injectReducer from '../store/utils/injectReducer';
import injectSaga from '../store/utils/injectSaga';

interface IOwnProps {
  appConfig: IApplicationConfig;
  store: IStore;
}

interface IState {
  routes: IRoute[];
  isLoading: boolean;
}

const getDefaultState = (): IState => ({
  isLoading: true,
  routes: [],
});

const ModuleLoader: React.FunctionComponent<IOwnProps & RouteComponentProps> = ({
  appConfig,
  location,
  store,
}) => {
  const [state, setState] = React.useState<IState>(getDefaultState());
  const { isLoading, routes } = state;

  React.useEffect(() => {
    async function load() {
      const path = location.pathname.replace(/\/+$/, '');

      const target = appConfig[path];

      if (target) {
        const { injectedReducerKey, injectedSagaKey, loadModule, moduleName, useSrc } = target;
        let module: IModule;

        if (useSrc) {
          module = await loadModule();
        } else {
          await loadModule();
          module = moduleName ? window[moduleName] : {};
        }

        const { reducer, routes, saga } = module;

        injectReducer(store, injectedReducerKey, reducer);

        injectSaga(store, injectedSagaKey, { saga });

        setTimeout(() => {
          setState({ isLoading: false, routes });
        }, 5000);
      } else {
        setState({ isLoading: false, routes: [] });
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div>
      {isLoading && routes.length === 0 && <span>routes loading</span>}
      {isLoading && routes.length > 0 && <span>routes updating</span>}
      {!isLoading && routes.length > 0 && <span>routes loaded</span>}
      {!isLoading && routes.length === 0 && <span>routes are not found</span>}
      {renderRoutes(routes)}
    </div>
  );
};

ModuleLoader.displayName = 'ModuleLoader';

const ModuleLoaderRouter = withRouter(ModuleLoader);

export { ModuleLoaderRouter as ModuleLoader };
