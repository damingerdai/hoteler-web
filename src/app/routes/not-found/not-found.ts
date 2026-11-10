import { Component } from '@angular/core';
import { ErrorCode } from 'src/app/shared/components';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.html',
    styleUrls: ['./not-found.scss'],
    imports: [ErrorCode],
})
export class NotFound {}
