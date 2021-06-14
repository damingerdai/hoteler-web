import { IUserToken } from "./user-token";

export interface IUser extends IUserToken {
  id: string;
  username: string;
  accessToken: string;
}
