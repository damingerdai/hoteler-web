import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { DataReponse, ICustomerCheckinRecord } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class CustomerCheckinRecordService {

  constructor(
    private api: ApiService
  ) { }

  public create(customerCheckinRecord: Partial<ICustomerCheckinRecord>): Observable<DataReponse<number>> {
    return this.api.post<DataReponse<number>>('api/v1/customer-checkin-record', customerCheckinRecord as any);
  }
}
