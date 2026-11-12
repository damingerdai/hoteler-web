import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { UserSession } from '../services/settings/user-session';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
    for (const status of [401, 403, 500]) {
        it('handles HTTP ' + status, () => {
            let cleared = false;
            let closed = false;
            let destination: string;
            TestBed.configureTestingModule({
                providers: [
                    AuthInterceptor,
                    {
                        provide: UserSession,
                        useValue: {
                            user: null,
                            clearUser: () => {
                                cleared = true;
                            },
                        },
                    },
                    {
                        provide: MatDialog,
                        useValue: {
                            closeAll: () => {
                                closed = true;
                            },
                        },
                    },
                    {
                        provide: Router,
                        useValue: {
                            navigateByUrl: (url: string) => {
                                destination = url;
                            },
                        },
                    },
                ],
            });
            const error = new HttpErrorResponse({ status });
            let received: unknown;
            TestBed.inject(AuthInterceptor)
                .intercept(new HttpRequest('GET', '/api/v1/token'), {
                    handle: () => throwError(() => error),
                })
                .subscribe({
                    error: (value) => {
                        received = value;
                    },
                });
            expect(received).toBe(error);
            expect(cleared).toBe(status !== 500);
            expect(closed).toBe(status !== 500);
            expect(destination).toBe(status === 500 ? undefined : '/' + status);
        });
    }
});
