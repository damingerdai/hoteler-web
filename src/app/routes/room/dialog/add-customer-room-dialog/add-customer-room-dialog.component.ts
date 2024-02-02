import { CurrencyPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Customers, IRoom } from 'src/app/core/models';
import { CustomerService } from 'src/app/core/services/customers';

@Component({
  selector: 'app-add-customer-room-dialog',
  templateUrl: './add-customer-room-dialog.component.html',
  styleUrls: ['./add-customer-room-dialog.component.scss'],
  standalone: true,
  imports: [
    CurrencyPipe,

    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,

    ReactiveFormsModule,
  ]
})
export class AddCustomerRoomDialogComponent implements OnInit {

  protected get checkInTime(): FormGroup {
    return this.form.get('checkInTime') as FormGroup;
  }

  protected minDate = new Date();


  public customers: Customers = [];
  public form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private customerApi: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: IRoom
  ) {
    const currentDate = new Date();
    const nextDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
    this.form = this.fb.group({
      customerId: [null, [Validators.required]],
      roomId: [data.id, [Validators.required]],
      checkInTime: this.fb.group({
        beginDate: [currentDate, [Validators.required]],
        endDate: [nextDate, [Validators.required]]
      })
    });
    this.form.get('roomId').disable({ onlySelf: true, emitEvent: true });
  }

  ngOnInit(): void {
    this.customerApi.list().subscribe(res => {
      if (res.status === 200) {
        this.customers = res.data;
      }
    });
  }

}
