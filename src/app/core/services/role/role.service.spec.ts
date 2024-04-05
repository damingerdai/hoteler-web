import { TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import { ApiTestingModule } from '../../testings';

describe('RoleService', () => {
  let service: RoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule]
    });
    service = TestBed.inject(RoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
