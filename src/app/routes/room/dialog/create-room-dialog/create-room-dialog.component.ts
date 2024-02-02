import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ]
})
export class CreateRoomDialogComponent implements OnInit {

  private fb = inject(FormBuilder);

  public room: FormGroup;

  public get roomname() {
    return this.room.get('roomname');
  }

  public get price() {
    return this.room.get('price');
  }

  constructor(
  ) {
    this.room = this.fb.group({
      roomname: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
  }
}
