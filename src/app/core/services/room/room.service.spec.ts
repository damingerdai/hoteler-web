import { TestBed } from '@angular/core/testing';
import { ApiTestingModule } from '../../testings';

import { RoomService } from './room.service';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(RoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
