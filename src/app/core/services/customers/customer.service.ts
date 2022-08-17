import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

import { ApiService } from 'src/app/core/api/api.service';
import { DataResponse, IPastWeekCustomerCountStat, IResponse, ListResponse } from 'src/app/core/models';
import { ICustomer } from 'src/app/core/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private api: ApiService
  ) { }

  public create(customer: ICustomer): Observable<DataResponse<number>> {
    return this.api.post<DataResponse<number>>('api/v1/customer', customer as any);
  }

  public update(customer: ICustomer): Observable<DataResponse<number>> {
    return this.api.put<DataResponse<number>>('api/v1/customer', customer as any);
  }

  public list(): Observable<ListResponse<ICustomer>> {
    return this.api.get<ListResponse<ICustomer>>('api/v1/customers');
  }

  public delete(id: string | number): Observable<IResponse> {
    return this.api.delete<IResponse>(`api/v1/customer/${id}`);
  }

  public getPastWeekCustomerCountStat(): Observable<DataResponse<IPastWeekCustomerCountStat>> {
    return this.api.get<DataResponse<IPastWeekCustomerCountStat>>('api/v1/stat/customers/counts');
  }
}
