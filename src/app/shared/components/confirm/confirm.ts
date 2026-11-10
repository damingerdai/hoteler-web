import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

interface IConfirmData {
    title: string;
    description: string;
}

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.html',
    styleUrls: ['./confirm.scss'],
    imports: [MatButtonModule, MatDialogModule],
})
export class Confirm {
    data = inject<IConfirmData>(MAT_DIALOG_DATA);
}
