export interface II18n<TConfig> {
  load: (config: TConfig) => Promise<any>;
  t: (key: string) => string;
}

export const I18N = Symbol.for('I18N');
