import { APP_INITIALIZER } from '@angular/core';

import { MatIconService } from './bootstrap/mat-icon.service';

export function MatIconServiceFactory(matIconService: MatIconService) {
  return () => matIconService.load();
}

export const appInitializerProviders = [
  {
    provide: APP_INITIALIZER,
    useFactory: MatIconServiceFactory,
    deps: [MatIconService],
    multi: true,
  }
];
