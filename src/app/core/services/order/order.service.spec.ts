import { TestBed } from '@angular/core/testing';
import { ApiTestingModule } from '../../testings';

import { OrderService } from './order.service';

describe('OrderService', () => {
    let service: OrderService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ApiTestingModule],
        });
        service = TestBed.inject(OrderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
