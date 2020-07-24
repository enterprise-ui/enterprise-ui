// import './i18n';

import React from 'react';

import { configureStore, ModuleLoader } from '@enterprise-ui/appcore';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import AppConfig from '../config';

import { usePrefersDarkMode } from './hooks/usePrefersDarkMode';
import rootReducer from './store/reducers/rootReducer';
import { GlobalStyle } from './styles/global';

const store = configureStore(rootReducer, [], window.__PRELOADED_STATE__);

const AppContainer = () => {
  const prefersDarkMode = usePrefersDarkMode();

  return (
    <React.StrictMode>
      <ThemeProvider theme={{ mode: prefersDarkMode ? 'dark' : 'light' }}>
        <GlobalStyle />
        <Provider store={store}>
          <Router>
            <Link to="/news">News</Link>
            <Link to="/films">Films</Link>
            <ModuleLoader appConfig={AppConfig} store={store} />
          </Router>
        </Provider>
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
