import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    DirectivesModule
  ]
})
export class UiModule { }
