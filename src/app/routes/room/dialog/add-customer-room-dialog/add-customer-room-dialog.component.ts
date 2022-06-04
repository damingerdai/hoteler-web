import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customers, IRoom } from 'src/app/core/models';
import { CustomerService } from 'src/app/core/services/customers';
import { format } from 'src/app/core/utils/date';

@Component({
  selector: 'app-add-customer-room-dialog',
  templateUrl: './add-customer-room-dialog.component.html',
  styleUrls: ['./add-customer-room-dialog.component.scss']
})
export class AddCustomerRoomDialogComponent implements OnInit {

  public customers: Customers = [];
  public form: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    // private dialogRef: MatDialogRef<AddCustomerRoomDialogComponent>,
    private customerApi: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: IRoom
  ) {
    const currentDate = new Date();
    const nextDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
    this.form = this.fb.group({
      customerId: [null, [Validators.required]],
      roomId: [data.id, [Validators.required]],
      beginDate: [format(currentDate, 'yyyy-MM-dd'), [Validators.required]],
      endDate: [format(nextDate, 'yyyy-MM-dd'), [Validators.required]]
    });
    this.form.get('roomId').disable({ onlySelf: true, emitEvent: true });
    this.form.get('beginDate').disable();
    this.form.get('endDate').disable();
    console.log(this.form);
  }

  ngOnInit(): void {
    this.customerApi.list().subscribe(res => {
      if (res.status === 200) {
        this.customers = res.data;
      }
    });
  }

}
