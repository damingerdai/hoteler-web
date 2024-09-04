import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { ToasterContainerComponent } from 'angular-toaster';
import { filter } from 'rxjs';
import { CoreModule } from './core';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CoreModule,
    LayoutModule,
    SharedModule,
    RouterOutlet,
    ToasterContainerComponent,
  ]
})
export class AppComponent {

  constructor(swUpdate: SwUpdate) {
    swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(() => {
        swUpdate.activateUpdate().then(() => {
          document.location.reload();
        });
      });

  }
}
