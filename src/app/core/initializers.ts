import { APP_INITIALIZER } from '@angular/core';
import { FontfaceobserverService } from './bootstrap/fontfaceobserver.service';

const FontfaceobserverServiceFactory = (fontfaceobserverService: FontfaceobserverService) => {
  return () => fontfaceobserverService.load();
};

export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: FontfaceobserverServiceFactory,
    deps: [FontfaceobserverService],
    multi: true,
  },
];
