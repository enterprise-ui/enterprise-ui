import 'reflect-metadata';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import { injectable } from 'inversify';

import { II18N } from '../context/beans/i18n';
import { IDIContainerPreloadable } from '../context/container';

import { II18NConfig, II18NLoadable } from './Models';

export const I18N_DEFAULT_CONFIG: II18NConfig = {
  load: 'languageOnly',
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
};

@injectable()
class I18NService implements II18N, II18NLoadable, IDIContainerPreloadable {
  private _i18n: i18n.i18n;

  constructor(config: II18NConfig = {}) {
    this._i18n = i18n.createInstance({ ...I18N_DEFAULT_CONFIG, ...config }).use(LanguageDetector).use(Backend);
  }

  t(key: string) {
    return this._i18n.t(key);
  }

  load(): Promise<i18n.TFunction> {
    return this._i18n.init();
  }

  preload(): Promise<i18n.TFunction> {
    return this._i18n.init();
  }
}

export {I18NService};
