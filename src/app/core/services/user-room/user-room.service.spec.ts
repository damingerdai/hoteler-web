import { TestBed } from '@angular/core/testing';

import { UserRoomService } from './user-room.service';

describe('UserRoomService', () => {
  let service: UserRoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
