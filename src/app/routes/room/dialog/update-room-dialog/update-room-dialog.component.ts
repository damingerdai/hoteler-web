import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IRoom } from '../../../../core/models';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-update-room-dialog',
    templateUrl: './update-room-dialog.component.html',
    styleUrls: ['./update-room-dialog.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
    ]
})
export class UpdateRoomDialogComponent implements OnInit {

  private fb = inject(FormBuilder);
  public room: FormGroup;

  public get roomname() {
    return this.room.get('roomname');
  }

  public get price() {
    return this.room.get('price');
  }

  public get status() {
    return this.room.get('status');
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IRoom
  ) {
    this.room = this.fb.group({
      roomname: [this.data.roomname, [Validators.required]],
      price: [this.data.price, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]],
      status: [this.data.status, [Validators.required]],
    });

    this.roomname.disable();
  }

  ngOnInit(): void {
  }

}
