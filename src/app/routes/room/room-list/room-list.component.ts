import { filter, switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Rooms } from 'src/app/core/models/room';
import { CreateRoomDialogComponent } from '../dialog/create-room-dialog/create-room-dialog.component';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  public displayedColumns: string[] = ['no', 'roomname', 'status'];

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
      width: '250px',
    });

    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      switchMap(roomname => this.roomApi.create(roomname))
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

  private fetchAllRooms() {
    this.roomApi.list().subscribe(rooms => this.rooms = rooms);
  }


}
