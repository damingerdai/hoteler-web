import { CommonModule } from '@angular/common';
import { NgModule, Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
