import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
