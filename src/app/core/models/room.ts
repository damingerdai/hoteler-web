export interface IRoom {
  id: string;
  roomname: string;
  price: number;
  status: string;
}

export type Rooms = IRoom[];
