import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared-module';
import { AdminLayout } from './admin-layout';
import { CommonLayout } from './common-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    AdminLayout,
    CommonLayout
  ],
})
export class LayoutModule { }
