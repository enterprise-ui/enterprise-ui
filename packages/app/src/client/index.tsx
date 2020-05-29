import './i18n';

import React from 'react';

import { ModuleLoader } from '@enterprise-ui/appcore';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { usePrefersDarkMode } from './hooks/usePrefersDarkMode';
import { GlobalStyle } from './styles/global';

const AppContainer = () => {
  const prefersDarkMode = usePrefersDarkMode();

  return (
    <React.StrictMode>
      <ThemeProvider theme={{ mode: prefersDarkMode ? 'dark' : 'light' }}>
        <GlobalStyle />
        <Router>
          <Link to="/pages">Pages</Link>
          {/* <ModuleLoader
            appConfig={MODULE_LOADER_CONFIG}
            initialState={window.__PRELOADED_STATE__}
          /> */}
        </Router>
      </ThemeProvider>
    </React.StrictMode>
  );
};

const container = document.getElementById('root');

if (window.__SSR_DATA__?.isServerInitialRender) {
  ReactDOM.hydrate(<AppContainer />, container);
} else {
  ReactDOM.render(<AppContainer />, container);
}
