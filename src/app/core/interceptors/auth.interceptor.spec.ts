import { TestBed } from '@angular/core/testing';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from '../services/local-storage';
import { SettingsService } from '../services/settings/settings.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      MatDialogModule
    ],
    providers: [
      AuthInterceptor,
      SettingsService,
      LocalStorageService
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
