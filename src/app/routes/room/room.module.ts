import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CreateRoomDialogComponent } from './dialog/create-room-dialog/create-room-dialog.component';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomRoutingModule } from './room-routing.module';
import { RoomService } from './services/room.service';


@NgModule({
  declarations: [
    RoomListComponent,
    CreateRoomDialogComponent
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
