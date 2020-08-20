export interface II18N {
  t: (key: string) => string;
}

export const I18N = Symbol.for('I18N');
