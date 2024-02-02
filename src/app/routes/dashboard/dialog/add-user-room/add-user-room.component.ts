import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { Customers, Rooms } from 'src/app/core/models';
import { CustomerService } from 'src/app/core/services/customers';
import { RoomService } from 'src/app/core/services/room';

@Component({
  selector: 'app-add-user-room',
  templateUrl: './add-user-room.component.html',
  styleUrls: ['./add-user-room.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,

    CurrencyPipe,
  ]
})
export class AddUserRoomComponent implements OnInit {

  private customerApi: CustomerService = inject(CustomerService);
  private fb: FormBuilder = inject(FormBuilder);
  private roomApi: RoomService = inject(RoomService);
  private dialogRef: MatDialogRef<AddUserRoomComponent> = inject(MatDialogRef<AddUserRoomComponent>);

  public customers: Customers = [];
  public rooms: Rooms = [];

  public form: FormGroup;

  public currentDate = new Date();

  constructor(
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
