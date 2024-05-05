import { Component } from '@angular/core';
import { PageHeaderComponent } from 'src/app/shared/components';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [PageHeaderComponent],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
})
export class OrdersComponent {}
