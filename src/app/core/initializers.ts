import { inject, provideAppInitializer } from '@angular/core';
import { FontLoader } from './bootstrap/font-loader';

const FontfaceobserverServiceFactory = (
    fontfaceobserverService: FontLoader
) => {
    return () => fontfaceobserverService.load();
};

export const appInitializerProviders = [
    provideAppInitializer(() => {
        const fontfaceobserverService = inject(FontLoader);

        return FontfaceobserverServiceFactory(fontfaceobserverService)();
    }),
];
