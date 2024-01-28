import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule, provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module';
import { httpInterceptorProviders } from './core/interceptors';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { appInitializerProviders } from './core/initializers';
import { CoreModule } from './core';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
      withComponentInputBinding(),
    ),
    httpInterceptorProviders,
    // TODO remove
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    appInitializerProviders,
    importProvidersFrom(
      BrowserModule,
      RouterModule,
      CoreModule,
      LayoutModule,
      SharedModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: isDevMode() !== true,
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      })
    )
  ]
};
