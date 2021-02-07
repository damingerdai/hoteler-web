import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { IRespone } from 'src/app/core/models';
import { Rooms } from 'src/app/core/models/room';

@Injectable()
export class RoomService {

  constructor(
    private api: ApiService
  ) { }

  public create(room: { roomname: string, price: string}): Observable<number> {
    return this.api.post<number>('api/v1/room', room);
  }

  public update(room: { id: number, roomname: string, price: string, status: number | string}): Observable<IRespone> {
    return this.api.put<IRespone>('api/v1/room', room as any);
  }

  public delete(id: number): Observable<IRespone> {
    return this.api.delete<IRespone>(`api/v1/room/${id}`);
  }

  public list(): Observable<Rooms> {
    return this.api.get<Rooms>('api/v1/rooms');
  }
}
