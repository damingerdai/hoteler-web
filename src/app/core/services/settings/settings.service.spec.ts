import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '../local-storage';

import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsService,
        {
          provide: LocalStorageService,
          useValue: {
            set: (a: string, b: any) => void 0,
            get: (a) => a,
          }
        }
      ]
    });
    service = TestBed.inject(SettingsService);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
