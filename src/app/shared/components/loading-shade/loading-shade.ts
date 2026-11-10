import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loading-shade',
    imports: [
        MatProgressSpinnerModule,
    ],
    templateUrl: './loading-shade.html',
    styleUrl: './loading-shade.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingShade {

}
