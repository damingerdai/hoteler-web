import { TestBed } from '@angular/core/testing';

import { FontLoader } from './font-loader';

describe('FontLoader', () => {
  let service: FontLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
