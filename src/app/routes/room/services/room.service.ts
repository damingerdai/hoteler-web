import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { Rooms } from 'src/app/core/models/room';

@Injectable()
export class RoomService {

  constructor(
    private api: ApiService
  ) { }

  public create(roomname: string): Observable<number> {
    return this.api.post<number>('api/v1/room', { roomname });
  }

  public list(): Observable<Rooms> {
    return this.api.get<Rooms>('api/v1/rooms');
  }
}
