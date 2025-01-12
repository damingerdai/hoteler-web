import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { Orders } from 'src/app/core/models';
import { OrderService } from 'src/app/core/services/order/order.service';
import { BreadcrumbComponent } from 'src/app/shared/components';

@Component({
    selector: 'app-orders',
    imports: [
        DatePipe,
        BreadcrumbComponent,
        MatButtonModule,
        MatDividerModule,
        MatCardModule,
        MatTableModule,
    ],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
    private orderApi = inject(OrderService);

    protected orders: Orders = [];

    protected displayedColumns: string[] = [
        'id',
        'customerId',
        'roomId',
        'beginDate',
        'endDate',
        // 'action',
    ];

    public ngOnInit(): void {
        this.orderApi.list().subscribe((res) => {
            console.log(res);
            this.orders = res.data;
        });
    }
}
