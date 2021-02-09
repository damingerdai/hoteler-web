import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs/operators';
import { Customers } from 'src/app/core/models';
import { CreateCustomerDialogComponent } from '../dialog';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'gender', 'cardId', 'phone', 'action'];

  public customers: Customers;

  constructor(
    private customerApi: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.customers = [];
  }

  ngOnInit(): void {
    this.fetchCustomers();
  }

  createCustomer() {
    const dialogRef = this.dialog.open(CreateCustomerDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      switchMap(customer => this.customerApi.create(customer))
    ).subscribe(res => {
      if (res.status === 200) {
        this.snackBar.open('创建客户成功');
        this.fetchCustomers();
      } else {
        this.snackBar.open('创建客户失败：' + res.error.message);
      }
    });
  }

  private fetchCustomers() {
    this.customerApi.list().subscribe((customers) => this.customers = customers);
  }

}
