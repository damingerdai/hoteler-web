import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'tfontfaceobserver';
import { StyleManagerService } from '../services/style-manager/style-manager.service';

@Injectable({
    providedIn: 'root',
})
export class FontfaceobserverService {
    private styleManager = inject(StyleManagerService);

    load() {
        const fontLoadFunc = (observer) => {
            new Observer('Material Icons')
                .load({
                    timeout: 1000,
                })
                .then(() => observer.next())
                .catch((error) => observer.error(error))
                .finally(() => observer.complete());
        };
        const o = new Observable(fontLoadFunc);

        return new Promise<void>((resolve) => {
            o.subscribe({
                next: () => resolve(),
                error: () => {
                    this.styleManager.setStyle(
                        'font-fmaily',
                        'https://fonts.loli.net/css2?family=Roboto:wght@300;400;500&display=swap'
                    );
                    this.styleManager.setStyle(
                        'font-icon',
                        'https://fonts.loli.net/icon?family=Material+Icons'
                    );
                    resolve();
                },
            });
        });
    }
}
