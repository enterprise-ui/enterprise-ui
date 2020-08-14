export interface II18n<TConfig> {
  init: (config: TConfig) => void;
  loadNamespaces: (ns: string[]) => Promise<void>;
}

export const I18N = Symbol.for('I18N');
