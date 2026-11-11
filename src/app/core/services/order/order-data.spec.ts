import { TestBed } from '@angular/core/testing';
import { ApiTestingModule } from '../../testings';

import { OrderData } from './order-data';

describe('OrderData', () => {
    let service: OrderData;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ApiTestingModule],
        });
        service = TestBed.inject(OrderData);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
