import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserSession } from './user-session';

/** Coordinates UI cleanup when a session ends. */
@Injectable({ providedIn: 'root' })
export class SessionNavigation {
    private readonly session = inject(UserSession);
    private readonly dialog = inject(MatDialog);
    private readonly router = inject(Router);

    logout(): void {
        this.end('/login');
    }

    expire(): void {
        if (this.session.isAuthenticated) {
            this.end('/401');
        }
    }

    private end(destination: string): void {
        try {
            this.session.clearUser();
        } finally {
            this.dialog.closeAll();
            void this.router.navigateByUrl(destination);
        }
    }
}
