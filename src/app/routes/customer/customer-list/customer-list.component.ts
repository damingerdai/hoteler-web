import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, map, switchMap } from 'rxjs/operators';
import { Customers, ICustomer } from 'src/app/core/models';
import { CustomerService } from 'src/app/core/services/customers';
import { ConfirmComponent } from 'src/app/shared/components';
import { CreateCustomerDialogComponent, UpdateCustomerDialogComponent } from '../dialog';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'gender', 'cardId', 'phone', 'action'];

  public customers: Customers;

  public isLoading: boolean;

  public layout: 'table' | 'card';

  constructor(
    private customerApi: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.customers = [];
    this.isLoading = true;
    this.layout = 'card';
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

  updateCustomer(customer: ICustomer) {
    const dialogRef = this.dialog.open(UpdateCustomerDialogComponent, { width: '400px', data: customer});

    dialogRef.afterClosed().pipe(
      filter(res => !!res),
      map(res => {
        return {
          id: customer.id,
          ...res
        };
      }),
      switchMap(request => this.customerApi.update(request))
    ).subscribe(res => {
      if (res.status === 200) {
        this.snackBar.open('更新客户成功', 'X');
        this.fetchCustomers();
      } else {
        this.snackBar.open('更新客户失败：' + res.error.message, 'X', { duration: 2000});
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

  toggleLayout() {
    this.layout === 'table' ? this.layout = 'card' : this.layout = 'table';
  }

  private fetchCustomers() {
    this.isLoading = true;
    this.customerApi.list().subscribe((res) => {
      if (res.status === 200) {
        this.customers =  res.data;
      } else {
        this.snackBar.open('获取客户失败：' + res.error.message);
      }
      this.isLoading = false;
    });
  }

}
