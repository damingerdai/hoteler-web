import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { DataResponse, IOrder } from '../../models';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private api: ApiService) {}

    public create(order: Partial<IOrder>): Observable<DataResponse<number>> {
        return this.api.post<DataResponse<number>>(
            'api/v1/orders',
            order as HttpParams
        );
    }
}
