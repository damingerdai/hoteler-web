import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivateFn, Router } from '@angular/router';

import { UserSession } from '../services/settings/user-session';

export const canActivateFn: CanActivateFn = () => {
    const router = inject(Router);
    const setting = inject(UserSession);
    const dialog = inject(MatDialog);

    if (setting.isAuthenticated) {
        return true;
    }
    dialog.closeAll();
    return router.parseUrl('login');
};
