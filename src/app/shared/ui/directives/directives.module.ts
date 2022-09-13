import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexSpacerDirective } from './flex-spacer.directive';
import { ImgDirective } from './img.directive';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexSpacerDirective,
    ImgDirective
  ],
  exports: [
    FlexSpacerDirective,
    ImgDirective
  ]
})
export class DirectivesModule { }
