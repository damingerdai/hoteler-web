import { ApplicationConfig } from '@angular/core';
import {
    provideHttpClient,
    withInterceptorsFromDi,
    withXhr,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
} from '@angular/router';
import { routes } from './app.route';
import { httpInterceptorProviders } from './core/interceptors';
import { appInitializerProviders } from './core/initializers';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
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
        appInitializerProviders,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideNativeDateAdapter(),
        provideHotToastConfig({ theme: 'material' }),
    ],
};
