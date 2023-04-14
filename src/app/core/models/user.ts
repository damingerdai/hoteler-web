import { Permissions } from './permission';
import { Roles } from './roles';
import { IUserToken } from './user-token';

export interface IUser extends IUserToken {
  id: string;
  username: string;
  accessToken: string;
  roles: Roles
  permissions: Permissions
}


export interface IPastWeekCustomerCount {
  checkInDate: Date;
  customerCount: number;
}

export type PastWeekCustomerCounts = IPastWeekCustomerCount[];

export interface IPastWeekCustomerCountStat {
  pastWeekCustomerCounts: PastWeekCustomerCounts
}
