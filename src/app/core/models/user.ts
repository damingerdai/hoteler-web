import { IUserToken } from "./user-token";

export interface IUser extends IUserToken {
  id: string;
  username: string;
  accessToken: string;
}


export interface IPastWeekCustomerCount {
  checkInDate: Date;
  customerCount: number;
}

export type PastWeekCustomerCounts = IPastWeekCustomerCount[];

export interface IPastWeekCustomerCountStat {
  pastWeekCustomerCounts: PastWeekCustomerCounts
}
