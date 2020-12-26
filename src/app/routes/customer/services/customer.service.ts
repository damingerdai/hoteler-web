import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { ApiService } from 'src/app/core/api/api.service';
import { Customers } from 'src/app/core/models/customer';

@Injectable()
export class CustomerService {

  constructor(
    private api: ApiService
  ) { }

  public list(): Observable<Customers> {
    return this.api.get<Customers>('api/v1/customers');
  }
}
