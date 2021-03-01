import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// TODO: remove
// import { NgApexchartsModule } from "ng-apexcharts";

import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    // NgApexchartsModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
