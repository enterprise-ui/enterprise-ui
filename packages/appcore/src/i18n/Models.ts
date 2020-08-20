export interface II18NConfig {
  backend?: {
    loadPath: string;
  };
  contextSeparator?: string;
  debug?: boolean;
  defaultNS?: string;
  fallbackLng?: string;
  interpolation?: {
    escapeValue: boolean;
  };
  lng?: string;
  load?: 'languageOnly';
  ns?: string[];
  react?: {
    useSuspense: boolean;
  };
}

export interface II18NLoadable {
  loadNamespaces: (config: II18NConfig) => Promise<any>;
}
