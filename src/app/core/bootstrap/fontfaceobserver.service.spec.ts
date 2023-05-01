import { TestBed } from '@angular/core/testing';

import { FontfaceobserverService } from './fontfaceobserver.service';

describe('FontfaceobserverService', () => {
  let service: FontfaceobserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontfaceobserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
