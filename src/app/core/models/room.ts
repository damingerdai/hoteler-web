export interface IRoom {
  id: string;
  roomname: string;
  price: number;
  status: number;
}

export type Rooms = IRoom[];

export interface IRoomStatusStat {
  inUseNums: number;
  notUsedNums: number;
  totalNums: number
}
