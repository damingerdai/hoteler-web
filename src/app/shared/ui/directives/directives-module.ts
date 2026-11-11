import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexSpacer } from './flex-spacer';
import { Img } from './img';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexSpacer,
    Img
  ],
  exports: [
    FlexSpacer,
    Img
  ]
})
export class DirectivesModule { }
