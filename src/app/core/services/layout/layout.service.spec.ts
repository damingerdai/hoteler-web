import { TestBed } from '@angular/core/testing';
import { ApiTestingModule } from '../../testings';

import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApiTestingModule],
      providers: [LayoutService]
    });
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
