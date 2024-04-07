import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { DataResponse, IResponse, IUser, ListResponse } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService
  ) { }

  public createUser(username: string, password: string, roles: string[] = []): Observable<IResponse> {
    return this.api.post<IResponse>('/api/v1/user', { username, password, roles });
  }

  public getCurrentUser(accessToken?: string): Observable<DataResponse<IUser>> {
    const headers = {
      Authorization: 'Bearer ' + accessToken
    };
    return this.api.get<DataResponse<IUser>>('/api/v1/user', null, headers);
  }

  public list(): Observable<ListResponse<IUser>> {
    return this.api.get<ListResponse<IUser>>('/api/v1/users');
  }

}
