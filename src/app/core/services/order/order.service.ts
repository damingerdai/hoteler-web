import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { DataResponse, IOrder, ListPageResponse } from '../../models';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private api = inject(ApiService);

    public create(order: Partial<IOrder>): Observable<DataResponse<number>> {
        return this.api.post<DataResponse<number>>(
            'api/v1/order',
            order as HttpParams
        );
    }

    public list(params?: {
        page?: number;
        pageSize: number;
        sort?: string;
        sortType?: string;
    }) {
        return this.api.get<ListPageResponse<IOrder>>('api/v1/orders', {
            ...params,
        });
    }
}
