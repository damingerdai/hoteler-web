export type Gender = 'F' | 'M' | 'N';


export interface ICustomer {
  id?: number;
  name: string;
  gender: Gender;
  cardId: string;
  phone: number;
}

export type Customers = ICustomer[];
