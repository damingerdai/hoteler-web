import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// TODO: remove
import { FlexLayoutModule } from '@angular/flex-layout';
import { ApexchartsModule } from 'src/app/shared/apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUserRoomComponent } from './dialog/add-user-room/add-user-room.component';


@NgModule({
  declarations: [DashboardComponent, AddUserRoomComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    DashboardRoutingModule,
    ApexchartsModule,
    SharedModule
  ]
})
export class DashboardModule { }
