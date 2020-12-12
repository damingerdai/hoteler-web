import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './shared.material.module';
import { UiModule } from './ui/ui.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiModule,
    SharedMaterialModule
  ],
  exports: [
    UiModule,
    SharedMaterialModule
  ]
})
export class SharedModule { }
