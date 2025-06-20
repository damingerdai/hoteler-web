import { Component, inject } from '@angular/core';
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
    imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmComponent {
    data = inject<IConfirmData>(MAT_DIALOG_DATA);
}
