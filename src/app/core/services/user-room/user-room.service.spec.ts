import { TestBed } from '@angular/core/testing';
import { ApiTestingModule } from '../../testings';

import { UserRoomService } from './user-room.service';

describe('UserRoomService', () => {
  let service: UserRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(UserRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
