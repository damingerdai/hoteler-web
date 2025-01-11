import { filter, map, switchMap, tap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import {
    MatButtonToggleChange,
    MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomizerComponent } from './customizer/customizer.component';
import { RoomService } from 'src/app/core/services/room';
import { IRoom, Rooms } from 'src/app/core/models';
import { of } from 'rxjs';
import { OrderService } from 'src/app/core/services/order';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import {
    AddCustomerRoomDialogComponent,
    CreateRoomDialogComponent,
    UpdateRoomDialogComponent,
} from './dialog';
import {
    BreadcrumbComponent,
    ConfirmComponent,
    TagComponent,
} from 'src/app/shared/components';
import { LoadingShadeComponent } from 'src/app/shared/components/loading-shade';

@Component({
    selector: 'app-menu',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTableModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatSelectModule,
        ReactiveFormsModule,
        CurrencyPipe,
        //SharedModule,
        LoadingShadeComponent,
        BreadcrumbComponent,
        CustomizerComponent,
        TagComponent,
    ],
})
export class RoomComponent implements OnInit {
    public layout = 'card';

    public displayedColumns: string[] = [
        'no',
        'roomname',
        'price',
        'status',
        'action',
    ];

    public rooms: Rooms;

    public roomForm: FormGroup;

    public isLoading: boolean;

    constructor(
        private dialog: MatDialog,
        private fb: FormBuilder,
        private roomApi: RoomService,
        private orderApi: OrderService,
        private snackBar: MatSnackBar
    ) {
        this.isLoading = true;
        this.roomForm = this.fb.group({
            status: [0],
        });

        this.roomForm
            .get('status')
            .valueChanges.pipe(
                tap(() => (this.isLoading = true)),
                map((res) =>
                    typeof res !== 'number' ? parseInt(res, 10) : res
                ),
                switchMap((s) =>
                    s ? this.roomApi.list({ status: s }) : this.roomApi.list()
                )
            )
            .subscribe({
                next: (res) => {
                    if (res.status === 200) {
                        this.rooms = res.data;
                    }
                    this.isLoading = false;
                },
                error: () => (this.isLoading = false),
            });
    }

    ngOnInit(): void {
        this.fetchAllRooms();
    }

    public createRoom() {
        const dialogRef = this.dialog.open(CreateRoomDialogComponent, {
            width: '400px',
        });

        dialogRef
            .afterClosed()
            .pipe(
                filter((res) => !!res),
                switchMap((res) => this.roomApi.create(res))
            )
            .subscribe(
                () => {
                    this.snackBar.open('创建房间成功🚀', 'X', {
                        duration: 500,
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                    });
                },
                (err) => {
                    console.error(err);
                },
                () => this.fetchAllRooms()
            );
    }

    public updateRoom(room: IRoom) {
        const dialogRef = this.dialog.open(UpdateRoomDialogComponent, {
            width: '400px',
            data: room,
        });
        dialogRef
            .afterClosed()
            .pipe(
                filter((res) => !!res),
                map((res) => {
                    return {
                        ...room,
                        ...res,
                    };
                }),
                switchMap((res) => this.roomApi.update(res))
            )
            .subscribe(
                (res) => {
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
                },
                (err) => {
                    console.error(err);
                },
                () => this.fetchAllRooms()
            );
    }

    public deleteRoom(id: string | number) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '400px',
            data: {
                title: '确定删除',
                description: '请确定是否删除？',
            },
        });
        dialogRef
            .afterClosed()
            .pipe(
                filter((res) => res === true),
                switchMap(() =>
                    this.roomApi.delete(
                        typeof id === 'string' ? parseInt(id, 10) : id
                    )
                )
            )
            .subscribe((res) => {
                if (res.status === 200) {
                    this.snackBar.open('删除房间成功🚀', 'X', {
                        duration: 500,
                        horizontalPosition: 'right',
                        verticalPosition: 'top',
                    });
                    this.fetchAllRooms();
                } else {
                    this.snackBar.open(
                        '删除房间失败:' + res.error.message,
                        'X',
                        {
                            duration: 500,
                            horizontalPosition: 'right',
                            verticalPosition: 'top',
                        }
                    );
                }
            });
    }

    public addOrderalog(room: IRoom) {
        const dialogRef = this.dialog.open(AddCustomerRoomDialogComponent, {
            width: '400px',
            data: room,
        });

        dialogRef
            .afterClosed()
            .pipe(
                filter((res) => !!res),
                map((res) => {
                    const checkInTime = res.checkInTime as {
                        beginDate: Date;
                        endDate: Date;
                    };
                    const beginDate = checkInTime.beginDate;
                    beginDate.setHours(12, 0, 0);
                    const endDate = checkInTime.endDate;
                    endDate.setHours(12, 0, 0);
                    res.beginDate = beginDate;
                    res.endDate = endDate;
                    return res;
                }),
                switchMap((res) => this.orderApi.create(res))
            )
            .subscribe((res) => {
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

    public layoutChange(layout: string) {
        this.layout = layout;
    }

    public layoutChange2(e: MatButtonToggleChange) {
        this.layout = e.value;
    }

    private fetchAllRooms() {
        this.isLoading = true;
        const status = this.roomForm.get('status').value;
        of(status)
            .pipe(
                map((res) =>
                    typeof res !== 'number' ? parseInt(res, 10) : res
                ),
                switchMap((s) =>
                    s ? this.roomApi.list({ status: s }) : this.roomApi.list()
                )
            )
            .subscribe({
                next: (res) => {
                    if (res.status === 200) {
                        this.rooms = res.data;
                    }
                    this.isLoading = false;
                },
                error: () => (this.isLoading = false),
            });
    }
}
