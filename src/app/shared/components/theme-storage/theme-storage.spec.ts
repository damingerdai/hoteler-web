import { TestBed } from '@angular/core/testing';

import { ThemeStorage } from './theme-storage';

describe('ThemeStorage', () => {
  let service: ThemeStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ThemeStorage ]
    });
    service = TestBed.inject(ThemeStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
