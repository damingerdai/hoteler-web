import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-room-dialog',
  templateUrl: './create-room-dialog.component.html',
  styleUrls: ['./create-room-dialog.component.scss']
})
export class CreateRoomDialogComponent implements OnInit {

  public room: FormGroup;

  public get roomname() {
    return this.room.get('roomname');
  }

  public get price() {
    return this.room.get('price');
  }

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateRoomDialogComponent>,
  ) {
    this.room = this.fb.group({
      roomname: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0), Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
  }
}
