import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { UnauthorizedComponent } from '../unauthorized/unauthorized.component';
import { UnauthorizedRoutingModule } from './unauthorized-routing.module';


@NgModule({
  declarations: [UnauthorizedComponent],
  imports: [
    CommonModule,
    SharedModule,
    UnauthorizedRoutingModule
  ]
})
export class UnauthorizedModule { }
