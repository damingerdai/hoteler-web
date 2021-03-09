import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RoomService } from 'src/app/core/services/room';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateRoomDialogComponent, UpdateRoomDialogComponent } from './dialog/';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomRoutingModule } from './room-routing.module';

@NgModule({
  declarations: [
    RoomListComponent,
    CreateRoomDialogComponent,
    UpdateRoomDialogComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule
  ],
  providers: [
    RoomService
  ]
})
export class RoomModule { }
