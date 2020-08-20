export interface II18N {
  load: (config: any) => Promise<any>;
  t: (key: string) => string;
}

export const I18N = Symbol.for('I18N');
