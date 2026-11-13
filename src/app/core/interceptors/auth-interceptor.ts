import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';
import { UserSession } from '../services/settings/user-session';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const session = inject(UserSession);
    const dialog = inject(MatDialog);

    const origin = environment.apiOrigin?.replace(/\/$/, '');
    const backendUrl =
        origin && req.url.startsWith(origin + '/')
            ? req.url.slice(origin.length)
            : req.url;
    const path = backendUrl.split(/[?#]/)[0];
    const isApi = path.startsWith('/api/') || path.startsWith('api/');
    const isLogin = path === '/api/v1/token' || path === 'api/v1/token';
    const token = session.user?.accessToken;

    const authenticatedRequest =
        isApi && !isLogin && token && !req.headers.has('Authorization')
            ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
            : req;

    return next(authenticatedRequest).pipe(
        catchError((error) => {
            if (
                error instanceof HttpErrorResponse &&
                (error.status === 401 || error.status === 403)
            ) {
                dialog.closeAll();
                session.clearUser();
                router.navigateByUrl(`/${error.status}`);
            }
            return throwError(() => error);
        })
    );
};
