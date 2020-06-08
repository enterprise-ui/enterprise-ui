import { IApplicationConfig } from '@enterprise-ui/appcore';
import { IRoute, IStore } from '@enterprise-ui/appcore';
import { StaticRouterContext } from 'react-router';

type TRenderDocumentMethod = (
  i18n: any,
  path: string,
  store: IStore,
  routes: IRoute[],
  context: StaticRouterContext,
) => JSX.Element;

export interface ISSROptions {
  appConfig: IApplicationConfig;
  spaPackageId: string;
  renderApp: TRenderDocumentMethod;
  routes: string[];
  routesConfig: IRoute[];
}
