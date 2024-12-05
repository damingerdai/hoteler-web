import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { DataResponse, ICustomerCheckinRecord } from '../../models';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerCheckinRecordService {

  constructor(
    private api: ApiService
  ) { }

  public create(customerCheckinRecord: Partial<ICustomerCheckinRecord>): Observable<DataResponse<number>> {
    return this.api.post<DataResponse<number>>('api/v1/customer-checkin-record', customerCheckinRecord as HttpParams);
  }
}
