import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { CreateCustomerDialogComponent } from './dialog';
import { CustomerService } from './services/customer.service';


@NgModule({
  declarations: [CustomerListComponent, CreateCustomerDialogComponent],
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
