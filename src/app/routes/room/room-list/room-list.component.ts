import { filter, map, switchMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import { FormBuilder, FormGroup } from '@angular/forms';
import { IRoom, Rooms } from '../../../core/models/room';
import { RoomService } from '../../../core/services/room';
import { AddCustomerRoomDialogComponent, CreateRoomDialogComponent, UpdateRoomDialogComponent } from '../dialog';
import { ConfirmComponent } from '../../../shared/components';
import { CustomerCheckinRecordService } from '../../../core/services/customer-checkin-record';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  public layout = 'card';

  public displayedColumns: string[] = ['no', 'roomname', 'price', 'status', 'action'];

  public rooms: Rooms;

  public roomForm: FormGroup;

  public isLoading: boolean;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private roomApi: RoomService,
    private customerCheckinRecordApi: CustomerCheckinRecordService,
    private snackBar: MatSnackBar
  ) {
    this.isLoading = true;
    this.roomForm = this.fb.group({
      status: [0]
    });

    this.roomForm.get('status').valueChanges
      .pipe(
        map(res => typeof res === 'string' ? parseInt(res, 10) : res)
      )
      .subscribe(status => {
        if (status === 0) {
          this.fetchAllRooms();
        } else {
          this.roomApi.list({status}).subscribe(res => {
            if (res.status === 200) {
              this.rooms = res.data;
            }
          });
        }

      });
  }

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
        this.snackBar.open('更新房间失败🚀：' + message, 'X', {
          duration: 500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      }
    }, err => {
      console.error(err);
    }, () => this.fetchAllRooms());
  }

  public deleteRoom(id: string | number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: {
        title: '确定删除',
        description: '请确定是否删除？'
      }
    });
    dialogRef.afterClosed().pipe(
      filter(res => res === true),
      switchMap(() => this.roomApi.delete(typeof id === 'string' ? parseInt(id, 10) : id))
    ).subscribe(res => {
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

  public addCustomerRoomDialog(room: IRoom) {
    const dialogRef = this.dialog.open(AddCustomerRoomDialogComponent, {
      width: '400px',
      data: room
    });

    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      map(res => {
        res.userId = res.customerId,
        res.beginDate = new Date(res.beginDate + ' 12:00:000');
        res.endDate = new Date(res.endDate + ' 12:00:000');
        return res;
      }),
      switchMap(res => this.customerCheckinRecordApi.create(res))
    ).subscribe(res => {
      if (res.status === 200) {
        this.snackBar.open('入住成功🚀', 'X', {
          duration: 500,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.fetchAllRooms();
      }
    });
  }

  public layoutChange(layout) {
      this.layout = layout;
  }

  private fetchAllRooms() {
    this.isLoading = true;
    this.roomApi.list().subscribe(res => {
      if (res.status === 200) {
        this.rooms = res.data;
      }
      this.isLoading = false;
    }, () =>   this.isLoading = false);
  }


}
