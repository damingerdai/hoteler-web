
import { enableProdMode, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { unregisterServiceWorkers } from './unregister-service-workers';

if (environment.production) {
  enableProdMode();
}

unregisterServiceWorkers()
  .then(hadServiceWorker => hadServiceWorker && location.reload());

bootstrapApplication(AppComponent, {...appConfig, providers: [provideZoneChangeDetection(), ...appConfig.providers]}).catch(err => console.error(err));
