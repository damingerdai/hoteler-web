import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorage } from '../services/local-storage';
import { UserSession } from '../services/settings/user-session';

import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MatDialogModule
    ],
    providers: [
      AuthInterceptor,
      UserSession,
      LocalStorage
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
