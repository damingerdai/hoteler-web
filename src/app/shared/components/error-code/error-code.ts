import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-error-code',
    templateUrl: './error-code.html',
    styleUrls: ['./error-code.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, RouterModule]
})
export class ErrorCode {
    public code = input<string>('');

    public title = input<string>('');

    public message = input<string>('');
}
