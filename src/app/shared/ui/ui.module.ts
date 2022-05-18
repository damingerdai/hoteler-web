import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from './button';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    DirectivesModule
  ],
  exports: [
    ButtonModule,
    DirectivesModule
  ]
})
export class UiModule { }
