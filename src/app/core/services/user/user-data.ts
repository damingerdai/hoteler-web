import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../../api/api-client';
import { DataResponse, IResponse, IUser, ListResponse } from '../../models';

@Service()
export class UserData {
    private api = inject(ApiClient);

    public createUser(
        username: string,
        password: string,
        roles: string[] = []
    ): Observable<IResponse> {
        return this.api.post<IResponse>('/api/v1/user', {
            username,
            password,
            roles,
        });
    }

    public getCurrentUser(
        accessToken?: string
    ): Observable<DataResponse<IUser>> {
        const headers = {
            Authorization: 'Bearer ' + accessToken,
        };
        return this.api.get<DataResponse<IUser>>('/api/v1/user', undefined, headers);
    }

    public list(): Observable<ListResponse<IUser>> {
        return this.api.get<ListResponse<IUser>>('/api/v1/users');
    }

    public delete(id: string): Observable<IResponse> {
        return this.api.delete<IResponse>(`/api/v1/user/${id}`);
    }
}
