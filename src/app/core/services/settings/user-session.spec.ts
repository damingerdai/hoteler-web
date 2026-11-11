import { TestBed } from '@angular/core/testing';
import { LocalStorage } from '../local-storage';

import { UserSession } from './user-session';

describe('UserSession', () => {
  let service: UserSession;
  let localStorageService: LocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserSession,
        {
          provide: LocalStorage,
          useValue: {
            set: () => void 0,
            get: (a) => a,
          }
        }
      ]
    });
    service = TestBed.inject(UserSession);
    localStorageService = TestBed.inject(LocalStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(localStorageService).toBeTruthy();
  });
});
