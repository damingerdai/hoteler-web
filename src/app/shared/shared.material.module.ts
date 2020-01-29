import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

const materials = [
  MatButtonModule,
  MatToolbarModule
];


@NgModule({
  declarations: [],
  imports: [
    ...materials
  ],
  exports: [
    ...materials
  ]
})
export class SharedMaterialModule { }
