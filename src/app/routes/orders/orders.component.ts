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
import { OrderService } from 'src/app/core/services/order/order.service';
import { BreadcrumbComponent } from 'src/app/shared/components';

@Component({
    selector: 'app-orders',
    imports: [
        DatePipe,
        BreadcrumbComponent,
        MatButtonModule,
        MatDividerModule,
        MatInputModule,
        MatProgressBarModule,
        MatCardModule,
        MatTableModule,
        MatIconModule,
    ],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
    private orderApi = inject(OrderService);

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
