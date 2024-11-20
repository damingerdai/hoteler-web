import { Component } from '@angular/core';
import { ErrorCodeComponent } from 'src/app/shared/components';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss'],
    imports: [
        ErrorCodeComponent,
    ]
})
export class NotFoundComponent {

}
