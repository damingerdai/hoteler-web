import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserSession } from '../services/settings/user-session';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Service()
export class AuthInterceptor implements HttpInterceptor {
    private readonly session = inject(UserSession);
    private readonly dialog = inject(MatDialog);
    private readonly router = inject(Router);

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        const origin = environment.apiOrigin?.replace(/\/$/, '');
        const backendUrl =
            origin && request.url.startsWith(origin + '/')
                ? request.url.slice(origin.length)
                : request.url;
        const path = backendUrl.split(/[?#]/)[0];
        const isApi = path.startsWith('/api/');
        const isLogin = path === '/api/v1/token';
        const token = this.session.user?.accessToken;
        const authenticatedRequest =
            isApi && !isLogin && token && !request.headers.has('Authorization')
                ? request.clone({
                      setHeaders: { Authorization: 'Bearer ' + token },
                  })
                : request;

        return next.handle(authenticatedRequest).pipe(
            catchError((error) => {
                if (
                    error instanceof HttpErrorResponse &&
                    (error.status === 401 || error.status === 403)
                ) {
                    this.dialog.closeAll();
                    this.session.clearUser();
                    void this.router.navigateByUrl('/' + error.status);
                }
                return throwError(() => error);
            })
        );
    }
}
