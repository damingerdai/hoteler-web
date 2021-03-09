import { filter, map, switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IRoom, Rooms } from 'src/app/core/models/room';
import { RoomService } from 'src/app/core/services/room';
import { CreateRoomDialogComponent, UpdateRoomDialogComponent } from '../dialog';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  public displayedColumns: string[] = ['no', 'roomname', 'price', 'status', 'action'];

  public rooms: Rooms;

  constructor(
    private dialog: MatDialog,
    private roomApi: RoomService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchAllRooms();
  }

  public createRoom() {
    const dialogRef = this.dialog.open(CreateRoomDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      switchMap(res => this.roomApi.create(res))
    ).subscribe(() => {
      this.snackBar.open('创建房间成功🚀', 'X', {
        duration: 500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }, err => {
      console.error(err);
    }, () => this.fetchAllRooms());
  }

  public updateRoom(room: IRoom) {
    console.log(room);
    const dialogRef = this.dialog.open(UpdateRoomDialogComponent, {
      width: '400px',
      data: room
    });
    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      map(res => {
        return {
          ...room,
          ...res
        };
      }),
      switchMap(res => this.roomApi.update(res))
    ).subscribe((res) => {
      if (res.status === 200) {
        this.snackBar.open('更新房间成功🚀', 'X', {
          duration: 500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      } else {
        const message = res.error.message;
        this.snackBar.open('更新房间失败🚀：' + message , 'X', {
          duration: 500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    }, err => {
      console.error(err);
    }, () => this.fetchAllRooms());
  }

  public deleteRoom(id: number) {
    this.roomApi.delete(id).subscribe(res => {
      if (res.status === 200) {
        this.snackBar.open('删除房间成功🚀', 'X', {
          duration: 500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.fetchAllRooms();
      } else {
        this.snackBar.open('删除房间失败:' + res.error.message, 'X', {
          duration: 500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    });
  }

  private fetchAllRooms() {
    this.roomApi.list().subscribe(res => {
      if (res.status === 200) {
        this.rooms = res.data;
      }
    });
  }


}
