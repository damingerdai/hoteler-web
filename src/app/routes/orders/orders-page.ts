import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs/operators';
import { Orders } from 'src/app/core/models';
import { OrderData } from 'src/app/core/services/order/order-data';
import { Breadcrumb } from 'src/app/shared/components';

@Component({
    selector: 'app-orders',
    imports: [
        DatePipe,
        Breadcrumb,
        MatButtonModule,
        MatDividerModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
    ],
    templateUrl: './orders-page.html',
    styleUrl: './orders-page.scss',
})
export class OrdersPage implements OnInit {
    private orderApi = inject(OrderData);

    protected orders = signal<Orders>([]);
    protected loading = signal(true);

    protected displayedColumns: string[] = [
        'id',
        'customerId',
        'roomId',
        'beginDate',
        'endDate',
        // 'action',
    ];

    public ngOnInit(): void {
        this.orderApi
            .list()
            .pipe(finalize(() => this.loading.set(false)))
            .subscribe((res) => {
                this.orders.set(res.data);
            });
    }
}
