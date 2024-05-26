import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, Optional } from '@angular/core';
import { SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({ imports: [CommonModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
