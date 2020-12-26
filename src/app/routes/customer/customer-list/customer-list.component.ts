import { Component, OnInit } from '@angular/core';
import { Customers } from 'src/app/core/models';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'gender', 'cardId', 'phone'];

  public customers: Customers;

  constructor(
    private customerApi: CustomerService
  ) {
    this.customers = [];
  }

  ngOnInit(): void {
    this.customerApi.list().subscribe((customers) => this.customers = customers);
  }

}
