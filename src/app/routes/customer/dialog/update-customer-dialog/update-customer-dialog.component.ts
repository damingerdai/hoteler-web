import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ICustomer } from 'src/app/core/models';

@Component({
  selector: 'app-update-customer-dialog',
  templateUrl: './update-customer-dialog.component.html',
  styleUrls: ['./update-customer-dialog.component.scss']
})
export class UpdateCustomerDialogComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
