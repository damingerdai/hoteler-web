import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IRoom } from 'src/app/core/models';

@Component({
  selector: 'app-update-room-dialog',
  templateUrl: './update-room-dialog.component.html',
  styleUrls: ['./update-room-dialog.component.scss']
})
export class UpdateRoomDialogComponent implements OnInit {

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
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateRoomDialogComponent>,
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

  onNoClick(): void {
    this.dialogRef.close();
  }

}
