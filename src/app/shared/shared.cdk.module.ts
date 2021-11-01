import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';

const cdks = [
  DragDropModule,
  LayoutModule
];


@NgModule({
  declarations: [],
  imports: [
    ...cdks
  ],
  exports: [
    ...cdks
  ]
})
export class SharedCdkModule { }
