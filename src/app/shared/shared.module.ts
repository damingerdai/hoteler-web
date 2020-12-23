import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent, PageHeaderComponent } from './components';

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
    SharedMaterialModule
  ],
  exports: [
    UiModule,
    RouterModule,
    ReactiveFormsModule,
    SharedMaterialModule,

    ...DECLARATIONS
  ]
})
export class SharedModule { }
