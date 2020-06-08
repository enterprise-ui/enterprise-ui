import 'babel-polyfill';

import AppConfig from '../config';

import { renderApp } from './main/renderApp';
import { bootstrap } from './bootstrap';

export const run = () => {
  bootstrap({
    appConfig: AppConfig,
    renderApp,
    routes: ['/', '/news'],
    routesConfig: [],
    spaPackageId: 'news',
  });
};
