import { TestBed } from '@angular/core/testing';
import { ApiTestingModule } from '../../testings';

import { CustomerCheckinRecordService } from './customer-checkin-record.service';

describe('UserRoomService', () => {
  let service: CustomerCheckinRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(CustomerCheckinRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
