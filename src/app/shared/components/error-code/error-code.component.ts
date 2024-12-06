import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-error-code',
    templateUrl: './error-code.component.html',
    styleUrls: ['./error-code.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, RouterModule]
})
export class ErrorCodeComponent {
    public code = input<string>('');

    public title = input<string>('');

    public message = input<string>('');
}
