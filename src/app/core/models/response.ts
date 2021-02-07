import { IUserToken } from './user-token';

export interface IApiError {
  code: string;
  message: string;
}

export interface IRespone {
  status: number;
  error?: IApiError;
}

export type UserTokenReponse = IRespone & { userToken: IUserToken };
