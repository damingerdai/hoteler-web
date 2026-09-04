import {
    Component,
    OnInit,
    inject,
    signal,
} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngxpert/hot-toast';
import { filter, finalize, map, switchMap } from 'rxjs/operators';
import { Customers, ICustomer } from 'src/app/core/models';
import { CustomerService } from 'src/app/core/services/customers';
import {
    BreadcrumbComponent,
    ConfirmComponent,
} from 'src/app/shared/components';
import {
    CreateCustomerDialogComponent,
    UpdateCustomerDialogComponent,
} from '../dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { EmptyStateComponent } from 'src/app/shared/components/empty-state';
import { MatIconModule } from '@angular/material/icon';
import {
    MatButtonToggleChange,
    MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { CustomerCardComponent } from '../customer-card/customer-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss'],
    imports: [
    BreadcrumbComponent,
    EmptyStateComponent,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    CustomerCardComponent,
    UpperCasePipe
],
})
export class CustomerListComponent implements OnInit {
    private customerApi = inject(CustomerService);
    private dialog = inject(MatDialog);
    private toast = inject(HotToastService);

    public displayedColumns: string[] = [
        'id',
        'name',
        'gender',
        'cardId',
        'phone',
        'action',
    ];

    public readonly customers = signal<Customers>([]);

    public readonly isLoading = signal(true);

    public readonly layout = signal<'table' | 'card' | 'carousel'>('card');

    ngOnInit(): void {
        this.fetchCustomers();
    }

    createCustomer() {
        const dialogRef = this.dialog.open(CreateCustomerDialogComponent, {
            width: '400px',
        });

        dialogRef
            .afterClosed()
            .pipe(
                filter((res) => !!res),
                switchMap((customer) => this.customerApi.create(customer))
            )
            .subscribe((res) => {
                if (res.status === 200) {
                    this.toast.success('创建客户成功');
                    this.fetchCustomers();
                } else {
                    this.toast.error('创建客户失败：' + res.error.message);
                }
            });
    }

    updateCustomer(customer: ICustomer) {
        const dialogRef = this.dialog.open(UpdateCustomerDialogComponent, {
            width: '400px',
            data: customer,
        });

        dialogRef
            .afterClosed()
            .pipe(
                filter((res) => !!res),
                map((res) => {
                    return {
                        id: customer.id,
                        ...res,
                    };
                }),
                switchMap((request) => this.customerApi.update(request))
            )
            .subscribe((res) => {
                if (res.status === 200) {
                    this.toast.success('更新客户成功');
                    this.fetchCustomers();
                } else {
                    this.toast.error(
                        '更新客户失败：' + res.error.message,
                        { duration: 2000 }
                    );
                }
            });
    }

    deleteCustomer(id: string | number) {
        const dialogRef = this.dialog.open(ConfirmComponent, {
            width: '400px',
            data: {
                title: '确定删除',
                description: '请确定是否删除？',
            },
        });

        dialogRef
            .afterClosed()
            .pipe(
                filter((res) => res === true),
                switchMap(() => this.customerApi.delete(id))
            )
            .subscribe((res) => {
                if (res.status === 200) {
                    this.toast.success('删除客户成功');
                    this.fetchCustomers();
                } else {
                    this.toast.error('创建客户失败：' + res.error.message);
                }
            });
    }

    toggleLayout() {
        switch (this.layout()) {
            case 'card':
                this.layout.set('table');
                break;
            case 'table':
                this.layout.set('carousel');
                break;
            case 'carousel':
                this.layout.set('card');
                break;
            default:
                this.layout.set('card');
        }
    }

    processCustomerPhone(customer: ICustomer): string {
        return customer.phone
            .toString(10)
            .replace(
                /^(\d{4})(\d*)(\d{4})$/,
                (a, b, c, d) => b + c.replace(/\d/g, '*') + d
            );
    }

    processCustomerCardId(customer: ICustomer): string {
        return customer.cardId.replace(
            /^(\d{4})(\d*)((\dX{4})|(\d{3}X))$/,
            (a, b, c, d) => b + c.replace(/\d/g, '*') + d
        );
    }

    public layoutChange(e: MatButtonToggleChange) {
        this.layout.set(e.value);
    }

    private fetchCustomers(): void {
        this.isLoading.set(true);
        this.customerApi
            .list()
            .pipe(finalize(() => this.isLoading.set(false)))
            .subscribe((res) => {
                if (res.status === 200) {
                    this.customers.set(res.data);
                } else {
                    this.toast.error('获取客户失败：' + res.error.message);
                }
            });
    }
}
