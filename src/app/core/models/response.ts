import { IUserToken } from './user-token';

export interface IApiError {
    code: string;
    message: string;
}

export interface IResponse {
    status: number;
    error?: IApiError;
}

export type UserTokenResponse = IResponse & { userToken: IUserToken };

export type DataResponse<T> = IResponse & { data: T };

export type ListResponse<T> = IResponse & { data: T[] };

export type ListPageResponse<T> = ListResponse<T> & { count: number };
