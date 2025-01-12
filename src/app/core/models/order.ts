import { ICustomer } from './customer';
import { IRoom } from './room';

export interface IOrder {
    id: string;
    customerId: string;
    customer?: ICustomer;
    roomId: string;
    room?: IRoom;
    beginDate: Date;
    endDate: Date;
}

export type Orders = IOrder[];
