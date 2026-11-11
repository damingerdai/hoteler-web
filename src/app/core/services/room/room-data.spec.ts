import { TestBed } from '@angular/core/testing';
import { ApiTestingModule } from '../../testings';

import { RoomData } from './room-data';

describe('RoomData', () => {
  let service: RoomData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(RoomData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
