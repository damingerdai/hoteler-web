import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CreateCustomerDialogComponent } from './dialog';
import { UpdateCustomerDialogComponent } from './dialog/update-customer-dialog/update-customer-dialog.component';
import { CustomerService } from './services/customer.service';


@NgModule({
  declarations: [CustomerListComponent, CreateCustomerDialogComponent, UpdateCustomerDialogComponent],
  providers: [
    CustomerService
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
