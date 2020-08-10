export interface IGetRequest {
  url: string;
  params?: any;
  options?: any;
}

export interface IAPI {
  get: (req: IGetRequest) => Promise<any>;
}

export const API = Symbol.for('IAPI');
