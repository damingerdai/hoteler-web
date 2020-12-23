import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomRoutingModule } from './room-routing.module';


@NgModule({
  declarations: [
    RoomListComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule
  ]
})
export class RoomModule { }
