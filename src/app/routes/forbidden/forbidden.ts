import { Component } from '@angular/core';
import { ErrorCode } from 'src/app/shared/components';

@Component({
    selector: 'app-forbidden',
    templateUrl: './forbidden.html',
    styleUrls: ['./forbidden.scss'],
    imports: [ErrorCode],
})
export class Forbidden {}
