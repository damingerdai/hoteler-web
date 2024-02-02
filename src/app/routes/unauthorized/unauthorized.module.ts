import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';
import { ErrorCodeComponent } from 'src/app/shared/components';


@NgModule({
  declarations: [UnauthorizedComponent],
  imports: [
    CommonModule,
    ErrorCodeComponent,
    UnauthorizedRoutingModule
  ]
})
export class UnauthorizedModule { }
