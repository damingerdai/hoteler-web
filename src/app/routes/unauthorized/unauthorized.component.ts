import { Component } from '@angular/core';
import { ErrorCodeComponent } from 'src/app/shared/components';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.scss'],
    imports: [
        ErrorCodeComponent,
    ]
})
export class UnauthorizedComponent {

  constructor() { }

}
