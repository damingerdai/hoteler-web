import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-customer-dialog',
  templateUrl: './create-customer-dialog.component.html',
  styleUrls: ['./create-customer-dialog.component.scss']
})
export class CreateCustomerDialogComponent implements OnInit {

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
    // : MatDialogRef<CreateCustomerDialogComponent>,
    private fb: FormBuilder,
  ) {
    this.customer = this.fb.group({
      name: ['', [Validators.required]],
      gender: ['M', [Validators.required]],
      cardId: [null, [Validators.required, Validators.pattern(/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/)]],
      phone: [null, [Validators.required, Validators.pattern(/^1[3-9]\d{9}$/)]]
    });
  }

  ngOnInit(): void {
  }

}
