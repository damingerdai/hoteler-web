import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

interface IConfirmData {
    title: string;
    description: string;
}

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss'],
    imports: [MatButtonModule, MatDialogModule]
})
export class ConfirmComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA)
        public data: IConfirmData
    ) {}
}
