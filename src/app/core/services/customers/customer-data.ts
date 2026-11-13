import { Observable } from 'rxjs';

import { Service, inject } from '@angular/core';

import { ApiClient } from 'src/app/core/api/api-client';
import {
    DataResponse,
    IPastWeekCustomerCountStat,
    IResponse,
    ListResponse,
} from 'src/app/core/models';
import { ICustomer } from 'src/app/core/models/customer';
import { httpResource } from '@angular/common/http';

@Service()
export class CustomerData {
    private api = inject(ApiClient);

    public create(customer: ICustomer): Observable<DataResponse<number>> {
        return this.api.post<DataResponse<number>>(
            'api/v1/customer',
            customer as unknown as Record<string, string>
        );
    }

    public update(customer: ICustomer): Observable<DataResponse<number>> {
        return this.api.put<DataResponse<number>>(
            'api/v1/customer',
            customer as unknown as Record<string, string>
        );
    }

    public list(): Observable<ListResponse<ICustomer>> {
        return this.api.get<ListResponse<ICustomer>>('api/v1/customers');
    }

    public delete(id: string | number): Observable<IResponse> {
        return this.api.delete<IResponse>(`api/v1/customer/${id}`);
    }

    public getPastWeekCustomerCountStat(): Observable<
        DataResponse<IPastWeekCustomerCountStat>
    > {
        return this.api.get<DataResponse<IPastWeekCustomerCountStat>>(
            'api/v1/stat/customers/counts'
        );
    }

    public getPastWeekCustomerCountStatResource() {
        return httpResource<DataResponse<IPastWeekCustomerCountStat>>(
            () => 'api/v1/stat/customers/counts'
        );
    }
}
