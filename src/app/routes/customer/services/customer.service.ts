import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { ApiService } from 'src/app/core/api/api.service';
import { DataReponse, IRespone, ListReponse } from 'src/app/core/models';
import { ICustomer } from 'src/app/core/models/customer';

@Injectable()
export class CustomerService {

  constructor(
    private api: ApiService
  ) { }

  public create(customer: ICustomer): Observable<DataReponse<number>> {
    return this.api.post<DataReponse<number>>('api/v1/customer', customer as any);
  }

  public update(customer: ICustomer): Observable<DataReponse<number>> {
    return this.api.put<DataReponse<number>>('api/v1/customer', customer as any);
  }

  public list(): Observable<ListReponse<ICustomer>> {
    return this.api.get<ListReponse<ICustomer>>('api/v1/customers');
  }

  public delete(id: string | number): Observable<IRespone> {
    return this.api.delete<IRespone>(`api/v1/customer/${id}`);
  }
}
