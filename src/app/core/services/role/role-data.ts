import { Service, inject } from '@angular/core';
import { ApiClient } from '../../api/api-client';
import { Observable } from 'rxjs';
import { IRole } from '../../models/roles';
import { ListResponse } from '../../models';

@Service()
export class RoleData {
    private api = inject(ApiClient);

    public list(): Observable<ListResponse<IRole>> {
        return this.api.get<ListResponse<IRole>>('/api/v1/roles');
    }
}
