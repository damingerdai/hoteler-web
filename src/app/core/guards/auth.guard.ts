import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateFn, Router } from '@angular/router';

import { SettingsService } from '../services/settings/settings.service';

export const canActivateFn: CanActivateFn = () => {
  const router = inject(Router);
  const setting = inject(SettingsService);
  const dialog = inject(MatDialog);

  if (setting.user) {
    return true;
  }
  dialog.closeAll();
  return router.parseUrl('login');
};

