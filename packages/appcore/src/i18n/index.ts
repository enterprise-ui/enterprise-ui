import 'reflect-metadata';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { injectable } from 'inversify';

import { II18N } from '../context/beans/i18n';

import { II18NConfig, II18NLoadable } from './Models';

export const I18N_DEFAULT_CONFIG: II18NConfig = {
  load: 'languageOnly',
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  debug: true,
};

@injectable()
class I18NService implements II18N, II18NLoadable {
  private _i18n: i18n.i18n;

  constructor() {
    this._i18n = i18n.createInstance().use(LanguageDetector).use(Backend);
  }

  t(key: string) {
    return this._i18n.t(key);
  }

  loadNamespaces(config: II18NConfig) {
    return this._i18n.init({ ...I18N_DEFAULT_CONFIG, ...config });
  }
}

export {I18NService};
