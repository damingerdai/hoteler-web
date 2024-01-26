import { NgModule, isDevMode } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from './core';
import { httpInterceptorProviders } from './core/interceptors';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { appInitializerProviders } from './core/initializers';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    LayoutModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: isDevMode() !== true,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    provideAnimationsAsync(),
    httpInterceptorProviders,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    appInitializerProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
