import { ApplicationConfig, isDevMode } from '@angular/core';
import {
    provideHttpClient,
    withInterceptorsFromDi,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
} from '@angular/router';
import { routes } from './app.route';
import { httpInterceptorProviders } from './core/interceptors';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { appInitializerProviders } from './core/initializers';
import { provideAngularToaster } from 'angular-toaster';
import { provideNativeDateAdapter } from '@angular/material/core';

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
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 2500 },
        },
        appInitializerProviders,
        provideHttpClient(withInterceptorsFromDi()),
        provideNativeDateAdapter(),
        provideAngularToaster(),
    ],
};
