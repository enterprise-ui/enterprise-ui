import {
  configureStore,
  IMatchedRouteLoadable,
  injectReducer,
  injectSaga,
  TRouteComponent,
} from '@enterprise-ui/appcore';
import { LoadableComponent } from '@loadable/component';
import compression from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import i18nmiddleware from 'i18next-express-middleware';
import { StaticRouterContext } from 'react-router';
import { matchRoutes } from 'react-router-config';

import rootReducer from '../client/store/reducers/rootReducer';

import i18nOptions from './i18n/options';
import { renderBlank } from './main/renderBlank';
import i18n from './i18n';
import { ISSROptions } from './models';
import renderer from './renderer';

const getPublicPath = (module: string) => `../../node_modules/${module}/build`;

export function bootstrap(options: ISSROptions) {
  const { appConfig, renderApp, routes, spaPackageId } = options;
  const app = express();

  function shouldCompress(req: Request, res: Response) {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }

  async function handleRequest(req: Request, res: Response, next: NextFunction) {
    const target = appConfig[req.path];

    const store = configureStore(rootReducer, []);

    if (target) {
      const { entryName, injectedReducerKey, injectedSagaKey, publicPath } = target;

      const path = `./public/${publicPath}/${entryName}.js`;
      //const { reducer, routes: configRoutes, saga } = require('@enterprise-ui/news');
      const module = await import(/* webpackIgnore: true */ path);

      console.log('module', module);

      const { reducer, routes: configRoutes, saga } = module.default;

      console.log('reducer', reducer);
      console.log('routes', configRoutes);
      console.log('saga', saga);

      console.log('inject reducer');
      injectReducer(store, injectedReducerKey, reducer);

      console.log('inject saga');
      injectSaga(store, injectedSagaKey, { saga });

      const routes: IMatchedRouteLoadable[] = matchRoutes(configRoutes, req.path);

      const preloadAll: Promise<TRouteComponent>[] = routes.map(({ route: { component } }) => {
        const loadable = component as LoadableComponent<any>;

        return loadable.load ? loadable.load() : new Promise((resolve) => resolve(loadable));
      });

      const routeProps = {
        location: { search: req.path },
        match: { params: { id: req.params.id } },
      };

      const ctx = { props: { ...routeProps, isServer: true }, store };

      Promise.all(preloadAll).then((components) => {
        const promises = components.map((component) => {
          const loadable = (component as any).default || component;

          return loadable.getInitialProps ? loadable.getInitialProps(ctx) : null;
        });

        Promise.all(promises)
          .then((staticProps) => {
            const context: StaticRouterContext = {};
            const AppComponent = renderApp(req.i18n, req.path, store, configRoutes, context);
            const content = renderer(
              AppComponent,
              store,
              {
                ...staticProps,
                isServerInitialRender: true,
              },
            );

            if (context.statusCode === 404) {
              res.status(404);
            }

            res.send(content);
          })
          .catch((err) => {
            next(err);
          });
      });
    } else {
      const AppComponent = renderBlank(req.path, {});
      const content = renderer(AppComponent);

      res.send(content);
    }
  }

  app.use(
    i18nmiddleware.handle(i18n, {
      removeLngFromUrl: false,
    }),
  );

  app.use(
    compression({
      level: 2,
      filter: shouldCompress,
    }),
  );

  const port = process.env.PORT || 5001;

  // app.use(express.static('public', { index: false }));
  app.use('/public', express.static('public'));

  app.get(routes, handleRequest);

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (req.xhr) {
      res.status(500).send({
        errorCode: 500,
        message: 'Internal Server Error',
      });
    } else {
      next(err);
    }
  });

  app.use(handleRequest);

  i18n.init(i18nOptions, (err) => {
    if (err) {
      throw new Error(err);
    }

    app.listen(port, () => {
      console.log(`Listening on port: ${port}`);
    });
  });
}
