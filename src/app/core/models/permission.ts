export enum Permission {
  MANAGE_ROOM = 'manage_room',
  MANAGE_CUSTOMER = 'manage_customer',
  MANAGE_DASHBOARD = 'manage_dashboard',
  MANAGE_USER = 'manage_user'
}

export interface IPermission {
  id: number;
  name: string;
  description: string;
}

export type Permissions = IPermission[];
