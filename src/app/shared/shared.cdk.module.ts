import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';

const cdks = [
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
