import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/api.service';
import { DataReponse, IUserRoom } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class UserRoomService {

  constructor(
    private api: ApiService
  ) { }

  public create(userRoom: Partial<IUserRoom>): Observable<DataReponse<number>> {
    return this.api.post<DataReponse<number>>('api/v1/users/rooms', userRoom as any);
  }
}
