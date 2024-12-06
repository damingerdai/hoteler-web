import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ICustomer } from 'src/app/core/models';

@Component({
    selector: 'app-update-customer-dialog',
    templateUrl: './update-customer-dialog.component.html',
    styleUrls: ['./update-customer-dialog.component.scss'],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class UpdateCustomerDialogComponent {

  public customer: FormGroup;

  public get name() {
    return this.customer.get('name');
  }

  public get gender() {
    return this.customer.get('gender');
  }

  public get cardId() {
    return this.customer.get('cardId');
  }

  public get phone() {
    return this.customer.get('phone');
  }

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: ICustomer
  ) {
    this.customer = this.fb.group({
      name: [this.data.name, [Validators.required]],
      gender: [this.data.gender, [Validators.required]],
      cardId: [this.data.cardId, [Validators.required, Validators.pattern(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/)]],
      phone: [this.data.phone, [Validators.required, Validators.pattern(/^1[3-9]\d{9}$/)]]
    });
  }

}
