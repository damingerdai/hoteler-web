import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../api/api.service';
import { Observable } from 'rxjs';
import { IRole } from '../../models/roles';
import { ListResponse } from '../../models';

@Injectable({
    providedIn: 'root',
})
export class RoleService {
    private api = inject(ApiService);

    public list(): Observable<ListResponse<IRole>> {
        return this.api.get<ListResponse<IRole>>('/api/v1/roles');
    }
}
