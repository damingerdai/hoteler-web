import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { filter, switchMap } from 'rxjs/operators';
import { Customers } from 'src/app/core/models';
import { ConfirmComponent } from 'src/app/shared/components';
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
        this.snackBar.open('创建客户成功', 'X');
        this.fetchCustomers();
      } else {
        this.snackBar.open('创建客户失败：' + res.error.message);
      }
    });
  }

  deleteCustomer(id: string | number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '400px',
      data: {
        title: '确定删除',
        description: '请确定是否删除？'
      }
    });

    dialogRef.afterClosed().pipe(
      filter(res => res === true),
      switchMap(() => this.customerApi.delete(id))
    ).subscribe(res => {
        if (res.status === 200) {
          this.snackBar.open('删除客户成功', 'X');
          this.fetchCustomers();
        } else {
          this.snackBar.open('创建客户失败：' + res.error.message);
        }
    });
  }

  private fetchCustomers() {
    this.customerApi.list().subscribe((res) => {
      if (res.status === 200) {
        this.customers =  res.data;
      } else {
        this.snackBar.open('获取客户失败：' + res.error.message);
      }
    });
  }

}
