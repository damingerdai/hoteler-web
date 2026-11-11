import { TestBed } from '@angular/core/testing';
import { ApiTestingModule } from '../../testings';

import { CustomerData } from './customer-data';

describe('CustomerData', () => {
  let service: CustomerData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(CustomerData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
