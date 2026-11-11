import { TestBed } from '@angular/core/testing';

import { StyleManager } from './style-manager';

describe('StyleManager', () => {
  let service: StyleManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StyleManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
