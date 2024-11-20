import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-create-customer-dialog',
    templateUrl: './create-customer-dialog.component.html',
    styleUrls: ['./create-customer-dialog.component.scss'],
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ]
})
export class CreateCustomerDialogComponent {

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
  ) {
    this.customer = this.fb.group({
      name: ['', [Validators.required]],
      gender: ['M', [Validators.required]],
      cardId: [null, [Validators.required, Validators.pattern(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/)]],
      phone: [null, [Validators.required, Validators.pattern(/^1[3-9]\d{9}$/)]]
    });
  }

}
