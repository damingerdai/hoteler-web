import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ForbiddenRoutingModule } from './forbidden-routing.module';
import { ForbiddenComponent } from './forbidden.component';
import { ErrorCodeComponent } from 'src/app/shared/components';


@NgModule({
  declarations: [ForbiddenComponent],
  imports: [
    CommonModule,
    ErrorCodeComponent,
    ForbiddenRoutingModule
  ]
})
export class ForbiddenModule { }
