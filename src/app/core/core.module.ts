import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, inject } from '@angular/core';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({ imports: [CommonModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class CoreModule {

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    const parentModule = inject(CoreModule, { optional: true, skipSelf: true })!;

    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
