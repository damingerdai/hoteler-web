import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ForbiddenRoutingModule } from './forbidden-routing.module';
import { ForbiddenComponent } from './forbidden.component';


@NgModule({
  declarations: [ForbiddenComponent],
  imports: [
    CommonModule,
    SharedModule,
    ForbiddenRoutingModule
  ]
})
export class ForbiddenModule { }
