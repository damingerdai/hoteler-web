import { TestBed } from '@angular/core/testing';

import { RoleData } from './role-data';
import { ApiTestingModule } from '../../testings';

describe('RoleData', () => {
  let service: RoleData;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(RoleData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
