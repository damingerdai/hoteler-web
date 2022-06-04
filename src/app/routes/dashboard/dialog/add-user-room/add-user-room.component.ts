import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { Customers, Rooms } from 'src/app/core/models';
import { CustomerService } from 'src/app/core/services/customers';
import { RoomService } from 'src/app/core/services/room';

@Component({
  selector: 'app-add-user-room',
  templateUrl: './add-user-room.component.html',
  styleUrls: ['./add-user-room.component.scss']
})
export class AddUserRoomComponent implements OnInit {

  public customers: Customers = [];
  public rooms: Rooms = [];

  public form: UntypedFormGroup;

  public currentDate = new Date();

  constructor(
    private customerApi: CustomerService,
    private dialogRef: MatDialogRef<AddUserRoomComponent>,
    private fb: UntypedFormBuilder,
    private roomApi: RoomService
  ) {
    this.form = this.fb.group({
      userId: [null, [Validators.required]],
      roomId: [null, [Validators.required]],
      beginDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]]
    });
  }

  onNoClick() {
    this.dialogRef.close(this.form.value);
  }

  ngOnInit(): void {
    this.customerApi.list().subscribe(res => {
      if (res.status === 200) {
        this.customers = res.data;
      }
    });

    this.roomApi.list().subscribe(res => {
      if (res.status === 200) {
        this.rooms = res.data;
      }
    });
  }

}
