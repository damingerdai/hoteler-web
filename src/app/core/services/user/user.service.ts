import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { DataResponse, IResponse, IUser } from '../../models';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService
  ) { }

  public createUser(username: string, password: string): Observable<IResponse> {
    return this.api.post<IResponse>('/api/v1/user', { username, password });
  }

  public getCurrentUser(): Observable<DataResponse<IUser>> {
    return this.api.get<DataResponse<IUser>>('/api/v1/user');
  }


}
