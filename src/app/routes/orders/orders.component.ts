import { Component } from '@angular/core';
import { BreadcrumbComponent } from 'src/app/shared/components';

@Component({
    selector: 'app-orders',
    standalone: true,
    imports: [BreadcrumbComponent],
    templateUrl: './orders.component.html',
    styleUrl: './orders.component.scss',
})
export class OrdersComponent {}
