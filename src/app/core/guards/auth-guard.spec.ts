import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorage } from '../services/local-storage';
import { UserSession } from '../services/settings/user-session';

import { canActivateFn } from './auth-guard';
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
        UserSession,
        LocalStorage
      ]
    });
    guard = canActivateFn;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
