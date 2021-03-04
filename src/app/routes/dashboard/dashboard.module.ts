import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// TODO: remove
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from 'src/app/shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
