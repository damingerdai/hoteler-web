import { IUserToken } from './user-token';

export interface IRespone {
  status: number;
}

export type UserTokenReponse = IRespone & { userToken: IUserToken };
