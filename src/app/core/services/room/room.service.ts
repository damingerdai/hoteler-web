import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { DataResponse, IResponse, ListResponse } from 'src/app/core/models';
import { IRoom, IRoomStatusStat } from 'src/app/core/models/room';

type RoomsListResponse = ListResponse<IRoom>;
type IRoomStatusStatReponse = DataResponse<IRoomStatusStat>;

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

  public update(room: { id: number, roomname: string, price: string, status: number | string}): Observable<IResponse> {
    return this.api.put<IResponse>('api/v1/room', room as unknown as HttpParams);
  }

  public delete(id: number): Observable<IResponse> {
    return this.api.delete<IResponse>(`api/v1/room/${id}`);
  }

  public list(room?: { status?: number }): Observable<RoomsListResponse> {
    return this.api.get<RoomsListResponse>('api/v1/rooms', room);
  }

  public getRoomStatusStat(): Observable<IRoomStatusStatReponse> {
    return this.api.get<IRoomStatusStatReponse>('api/v1/stat/rooms/nums');
  }
}

