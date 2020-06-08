import { IStaticProps,IStore } from '@enterprise-ui/appcore';
import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { ServerStyleSheet } from 'styled-components';

export default (
  App: JSX.Element,
  store?: IStore,
  staticProps?: IStaticProps,
  publicPath: string = 'public',
) => {
  // const statsFile = publicPath ? path.resolve(path.join(publicPath, 'loadable-stats.json')) : null;
  // let extractor = null;

  // if (statsFile) {
  //   try {
  //     extractor = new ChunkExtractor({ statsFile });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const sheet = new ServerStyleSheet();

  // const Appx = extractor?.collectChunks(App) || App;

  try {
    const content = renderToString(sheet.collectStyles(App));

    const styleTags = sheet.getStyleTags();
    // const scriptTags = extractor?.getScriptTags() || '';

    return `<!DOCTYPE html>
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="theme-color" content="#000000" />
                <meta name="description" content="Web site created using create-react-app" />
                ${styleTags}
                <link rel="icon" href="/public/favicon.ico" />
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
                />
                <link rel="apple-touch-icon" href="/public/logo192.png" />
                <link rel="manifest" href="/public/manifest.json" />
                <script crossorigin src="https://unpkg.com/react@16.13.1/umd/react.production.min.js"></script>
                <script crossorigin src="https://unpkg.com/react-dom@16.13.1/umd/react-dom.production.min.js"></script>
                <script crossorigin src="https://unpkg.com/redux@4.0.5/dist/redux.min.js"></script>
                <script crossorigin src="https://unpkg.com/react-redux@7.2.0/dist/react-redux.min.js"></script>
                <script crossorigin src="https://unpkg.com/react-router@5.2.0/umd/react-router.min.js"></script>
                <script crossorigin src="https://unpkg.com/react-router-dom@5.2.0/umd/react-router-dom.min.js"></script>
                <script crossorigin src="https://unpkg.com/react-router-config@5.1.1/umd/react-router-config.min.js"></script>
                <script crossorigin src="https://unpkg.com/redux-saga@1.1.3/dist/redux-saga.umd.min.js"></script>
                <script crossorigin src="https://unpkg.com/redux-saga@1.1.3/dist/redux-saga-effects.umd.min.js"></script>
                <script crossorigin src="https://unpkg.com/redux-thunk@2.3.0/dist/redux-thunk.min.js"></script>
                <script crossorigin src="https://unpkg.com/redux@4.0.5/dist/redux.min.js"></script>
                <script crossorigin src="/public/vendors/vendors.production.min.js"></script>
                <title>React App</title>
            </head>
            <body>
                <noscript>You need to enable JavaScript to run this app.</noscript>
                <div id="root">${content}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${serialize(store?.getState() || {}).replace(
                      /</g,
                      '\\u003c',
                    )}
                    window.__SSR_DATA__ = ${JSON.stringify(staticProps || {})}
                </script>
                <script src="/public/main.819aede80f8bc7a100de.bundle.js"></script>
            </body>
    </html>`;
  } catch (error) {
    console.error(error);
  } finally {
    sheet.seal();
  }
};
