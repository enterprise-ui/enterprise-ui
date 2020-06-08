import React from 'react';

import { IRoute, IStore } from '@enterprise-ui/appcore';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { StaticRouterContext } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { Link, StaticRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '../styles/global';

export const renderApp = (
  i18n: any,
  path: string,
  store: IStore,
  routes: IRoute[],
  context: StaticRouterContext,
) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ThemeProvider theme={{ mode: 'dark' }}>
          <GlobalStyle />
          <Router location={path} context={context}>
            <I18nextProvider i18n={i18n}>
              <Link to="/news">News</Link>
              {renderRoutes(routes)}
            </I18nextProvider>
          </Router>
        </ThemeProvider>
      </Provider>
    </React.StrictMode>
  );
};
