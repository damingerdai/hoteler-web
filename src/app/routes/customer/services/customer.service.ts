import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { ApiService } from 'src/app/core/api/api.service';
import { DataReponse } from 'src/app/core/models';
import { Customers, ICustomer } from 'src/app/core/models/customer';

@Injectable()
export class CustomerService {

  constructor(
    private api: ApiService
  ) { }

  public create(customer: ICustomer): Observable<DataReponse<number>> {
    return this.api.post<DataReponse<number>>('api/v1/customer', customer as any);
  }

  public list(): Observable<Customers> {
    return this.api.get<Customers>('api/v1/customers');
  }
}
