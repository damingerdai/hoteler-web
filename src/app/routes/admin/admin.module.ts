import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedMaterialModule,
    SharedModule
  ]
})
export class AdminModule { }
