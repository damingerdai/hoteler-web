import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxApexchartsModule } from 'ngx-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUserRoomComponent } from './dialog/add-user-room/add-user-room.component';


@NgModule({
  declarations: [DashboardComponent, AddUserRoomComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxApexchartsModule,
    SharedModule
  ]
})
export class DashboardModule { }
