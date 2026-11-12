import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserSession } from '../services/settings/user-session';
import { SessionNavigation } from '../services/settings/session-navigation';

@Service()
export class AuthInterceptor implements HttpInterceptor {
    private readonly session = inject(UserSession);
    private readonly navigation = inject(SessionNavigation);

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        // The application reaches its backend exclusively through relative /api URLs.
        const path = request.url.split(/[?#]/)[0];
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
                    error.status === 401 &&
                    isApi &&
                    !isLogin &&
                    token &&
                    this.session.user?.accessToken === token &&
                    authenticatedRequest.headers.get('Authorization') ===
                        'Bearer ' + token
                ) {
                    this.navigation.expire();
                }
                // Permission errors and login errors belong to the requesting UI.
                return throwError(() => error);
            })
        );
    }
}
