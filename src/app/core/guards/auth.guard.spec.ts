import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../services/local-storage';
import { SettingsService } from '../services/settings/settings.service';

import { canActivateFn } from './auth.guard';
import { CanActivateFn } from '@angular/router';

describe('canActivateFn', () => {
  let guard: CanActivateFn;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatDialogModule
      ],
      providers: [
        SettingsService,
        LocalStorageService
      ]
    });
    guard = canActivateFn;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
