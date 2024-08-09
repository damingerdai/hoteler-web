import {
    ApplicationConfig,
    importProvidersFrom,
    isDevMode,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
    RouterModule,
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
} from '@angular/router';
import { routes } from './app.route';
import { httpInterceptorProviders } from './core/interceptors';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { appInitializerProviders } from './core/initializers';
import { CoreModule } from './core';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { provideServiceWorker, ServiceWorkerModule } from '@angular/service-worker';
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
            withComponentInputBinding()
        ),
        httpInterceptorProviders,
        // TODO remove
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 2500 },
        },
        appInitializerProviders,
        provideServiceWorker('ngsw-worker.js', {
          enabled: !isDevMode(),
          registrationStrategy: 'registerWhenStable:30000'
        }),
        importProvidersFrom(
            BrowserModule,
            RouterModule,
            CoreModule,
            LayoutModule,
            SharedModule,
        ),
    ],
};
