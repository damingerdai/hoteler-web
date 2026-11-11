import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersPage } from './orders-page';
import { provideRouter } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrdersPage', () => {
    let component: OrdersPage;
    let fixture: ComponentFixture<OrdersPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, OrdersPage],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(OrdersPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
