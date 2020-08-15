import React from 'react';

import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { I18N,II18n } from '../context/beans/i18n';
import { useInject } from '../context/DIReactContext';
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
  isLoading: boolean;
  routes: IRoute[];
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
  const [i18n] = useInject<II18n<any>>(I18N);
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

        const { i18nConfig, reducer, routes, saga } = module;

        if (i18n && i18nConfig) {
          await i18n.load(i18nConfig);
        }

        injectReducer(store, injectedReducerKey, reducer);
        injectSaga(store, injectedSagaKey, { saga });

        setState({ isLoading: false, routes });
      } else {
        setState({ isLoading: false, routes: [] });
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <div>
      {isLoading && <span>routes loading</span>}
      {renderRoutes(routes)}
    </div>
  );
};

ModuleLoader.displayName = 'ModuleLoader';

const ModuleLoaderRouter = withRouter(ModuleLoader);

export { ModuleLoaderRouter as ModuleLoader };
