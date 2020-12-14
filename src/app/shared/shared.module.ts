import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedMaterialModule } from './shared.material.module';
import { UiModule } from './ui/ui.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiModule,
    ReactiveFormsModule,
    SharedMaterialModule
  ],
  exports: [
    UiModule,
    ReactiveFormsModule,
    SharedMaterialModule
  ]
})
export class SharedModule { }
