import { inject, provideAppInitializer } from '@angular/core';
import { FontfaceobserverService } from './bootstrap/fontfaceobserver.service';

const FontfaceobserverServiceFactory = (
    fontfaceobserverService: FontfaceobserverService
) => {
    return () => fontfaceobserverService.load();
};

export const appInitializerProviders = [
    provideAppInitializer(() => {
        const fontfaceobserverService = inject(FontfaceobserverService);

        return FontfaceobserverServiceFactory(fontfaceobserverService)();
    }),
];
