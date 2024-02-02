import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
  ]
})
export class ConfirmComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string, description: string },
  ) { }

}
