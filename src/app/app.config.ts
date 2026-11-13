import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    provideRouter,
    withComponentInputBinding,
    withInMemoryScrolling,
} from '@angular/router';
import { provideHotToastConfig } from '@ngxpert/hot-toast';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.route';
import { authInterceptor } from './core/interceptors';
import { appInitializerProviders } from './core/initializers';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(
            routes,
            withInMemoryScrolling({
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
            }),
            withComponentInputBinding()
        ),
        appInitializerProviders,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideNativeDateAdapter(),
        provideHotToastConfig({
            theme: 'material',
            position: 'top-right',
            duration: 3000,
        }),
    ],
};
