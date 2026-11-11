import { filter, map, switchMap, tap } from 'rxjs/operators';

import {
    Component,
    OnInit,
    inject,
    signal,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { MatButtonModule } from '@angular/material/button';
import {
    MatButtonToggleChange,
    MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RoomData } from 'src/app/core/services/room';
import { IRoom, Rooms } from 'src/app/core/models';
import { of } from 'rxjs';
import { OrderData } from 'src/app/core/services/order';
import { CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import {
    AddCustomerRoomDialog,
    CreateRoomDialog,
    UpdateRoomDialog,
} from './dialog';
import {
    Breadcrumb,
    Confirm,
} from 'src/app/shared/components';
import { EmptyState } from 'src/app/shared/components/empty-state';
import { RoomCard } from './room-card/room-card';

@Component({
    selector: 'app-menu',
    templateUrl: './room.html',
    styleUrls: ['./room.scss'],
    imports: [
        MatMenuModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTableModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatSelectModule,
        ReactiveFormsModule,
        CurrencyPipe,
        Breadcrumb,
        EmptyState,
        RoomCard,
    ],
})
export class Room implements OnInit {
    private dialog = inject(MatDialog);
    private fb = inject(FormBuilder);
    private roomApi = inject(RoomData);
    private orderApi = inject(OrderData);
    private toast = inject(HotToastService);

    public layout = signal<'table' | 'card' | 'carousel'>('card');

    public displayedColumns: string[] = [
        'no',
        'roomname',
        'price',
        'status',
        'action',
    ];

    public readonly rooms = signal<Rooms>([]);

    public roomForm: FormGroup;

    public readonly isLoading = signal(true);

    constructor() {
        this.roomForm = this.fb.group({
            status: [0],
        });

        this.roomForm
            .get('status')
            .valueChanges.pipe(
                tap(() => this.isLoading.set(true)),
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
                        this.rooms.set(res.data);
                    }
                    this.isLoading.set(false);
                },
                error: () => this.isLoading.set(false),
            });
    }

    ngOnInit(): void {
        this.fetchAllRooms();
    }

    public createRoom() {
        const dialogRef = this.dialog.open(CreateRoomDialog, {
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
                    this.toast.success('创建房间成功🚀', {
                        duration: 500,
                        position: 'top-right',
                    });
                },
                (err) => {
                    console.error(err);
                },
                () => this.fetchAllRooms()
            );
    }

    public updateRoom(room: IRoom) {
        const dialogRef = this.dialog.open(UpdateRoomDialog, {
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
                        this.toast.success('更新房间成功🚀', {
                            duration: 500,
                            position: 'top-right',
                        });
                    } else {
                        const message = res.error.message;
                        this.toast.error('更新房间失败🚀：' + message, {
                            duration: 500,
                            position: 'top-right',
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
        const dialogRef = this.dialog.open(Confirm, {
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
                    this.toast.success('删除房间成功🚀', {
                        duration: 500,
                        position: 'top-right',
                    });
                    this.fetchAllRooms();
                } else {
                    this.toast.error(
                        '删除房间失败:' + res.error.message,
                        {
                            duration: 500,
                            position: 'top-right',
                        }
                    );
                }
            });
    }

    public addOrderalog(room: IRoom) {
        const dialogRef = this.dialog.open(AddCustomerRoomDialog, {
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
                    this.toast.success('入住成功🚀', {
                        duration: 500,
                        position: 'top-right',
                    });
                    this.fetchAllRooms();
                } else {
                    this.toast.error('入住失败，请稍后再试');
                }
            });
    }

    public layoutChange(layout: string | MatButtonToggleChange) {
        if (layout instanceof MatButtonToggleChange) {
            this.layout.set(layout.value as 'table' | 'card' | 'carousel');
        } else {
            this.layout.set(layout as 'table' | 'card' | 'carousel');
        }
    }

    private fetchAllRooms() {
        this.isLoading.set(true);
        const status = this.roomForm.get('status')?.value;
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
                        this.rooms.set(res.data);
                    }
                    this.isLoading.set(false);
                },
                error: () => this.isLoading.set(false),
            });
    }
}
