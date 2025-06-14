import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { ToasterContainerComponent } from 'angular-toaster';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, ToasterContainerComponent],
})
export class AppComponent {
    constructor() {
        const swUpdate = inject(SwUpdate);

        swUpdate.versionUpdates
            .pipe(
                filter(
                    (evt): evt is VersionReadyEvent =>
                        evt.type === 'VERSION_READY'
                )
            )
            .subscribe(() => {
                swUpdate.activateUpdate().then(() => {
                    document.location.reload();
                });
            });
    }
}
