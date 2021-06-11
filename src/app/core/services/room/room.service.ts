import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { DataReponse, IRespone, ListReponse } from 'src/app/core/models';
import { IRoom, IRoomStatusStat } from 'src/app/core/models/room';

type RoomsListReponse = ListReponse<IRoom>;
type IRoomStatusStatReponse = DataReponse<IRoomStatusStat>;

@Injectable({
  providedIn: 'root'
})
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

  public list(room?: { status?: number }): Observable<RoomsListReponse> {
    return this.api.get<RoomsListReponse>('api/v1/rooms', room);
  }

  public getRoomStatusStat(): Observable<IRoomStatusStatReponse> {
    return this.api.get<IRoomStatusStatReponse>('api/v1/stat/rooms/nums');
  }
}

