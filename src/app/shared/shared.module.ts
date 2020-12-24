import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent, PageHeaderComponent } from './components';
import { SharedCdkModule } from './shared.cdk.module';
import { SharedMaterialModule } from './shared.material.module';
import { UiModule } from './ui/ui.module';

const DECLARATIONS = [
  NavbarComponent,
  PageHeaderComponent
];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    UiModule,
    RouterModule,
    ReactiveFormsModule,
    SharedCdkModule,
    SharedMaterialModule
  ],
  exports: [
    UiModule,
    RouterModule,
    ReactiveFormsModule,
    SharedCdkModule,
    SharedMaterialModule,

    ...DECLARATIONS
  ]
})
export class SharedModule { }
