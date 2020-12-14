import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexSpacerDirective } from './flex-spacer.directive';



@NgModule({
  declarations: [FlexSpacerDirective],
  imports: [
    CommonModule
  ],
  exports: [
    FlexSpacerDirective
  ]
})
export class DirectivesModule { }
