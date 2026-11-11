import { Component } from '@angular/core';
import { ErrorCode } from 'src/app/shared/components';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.html',
    styleUrls: ['./unauthorized.scss'],
    imports: [ErrorCode],
})
export class Unauthorized {}
