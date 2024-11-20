import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loading-shade',
    imports: [
        MatProgressSpinnerModule,
    ],
    templateUrl: './loading-shade.component.html',
    styleUrl: './loading-shade.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingShadeComponent {

}
