import React from 'react';

import { RouteComponentProps } from 'react-router';

import { I18N, II18N } from '../context/beans/i18n';
import { useInject } from '../context/DIReactContext';
import { IModule, IModuleConfig, IRoute } from '../Models';
import { renderRoutes } from '../router/renderRoutes';
import { IStore } from '../store/Models';
import injectReducer from '../store/utils/injectReducer';
import injectSaga from '../store/utils/injectSaga';

interface IOwnProps {
  config: IModuleConfig;
  store: IStore;
}

interface IState {
  isLoading: boolean;
  routes: IRoute[];
}

const getDefaultState = (): IState => ({
  isLoading: true,
  routes: [],
});

const ModuleLoader: React.FunctionComponent<IOwnProps & RouteComponentProps> = ({
  config,
  location,
  store,
}) => {
  const [state, setState] = React.useState<IState>(getDefaultState());
  const [i18n] = useInject<II18N>(I18N);

  const { routes } = state;

  React.useEffect(() => {
    async function load() {
      const { injectedReducerKey, injectedSagaKey, loadModule, moduleName, useSrc } = config;

      let module: IModule;

      if (useSrc) {
        module = await loadModule();
      } else {
        await loadModule();
        module = moduleName ? window[moduleName] : {};
      }

      const { i18nConfig, reducer, routes, saga } = module;

      if (i18n && i18nConfig) {
        await i18n.load(i18nConfig);
      }

      injectReducer(store, injectedReducerKey, reducer);
      injectSaga(store, injectedSagaKey, { saga });

      setState({ isLoading: false, routes });
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return renderRoutes(routes);
};

ModuleLoader.displayName = 'ModuleLoader';

export { ModuleLoader };
