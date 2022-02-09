import { NgModule } from '@angular/core';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';

const cdks = [
  DragDropModule,
  LayoutModule,
  PlatformModule
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
