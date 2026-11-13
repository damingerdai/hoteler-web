import {
    HttpErrorResponse,
    HttpHandlerFn,
    HttpRequest,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserSession } from '../services/settings/user-session';
import { authInterceptor } from './auth-interceptor';

describe('authInterceptor', () => {
    const state: {
        cleared: boolean;
        closed: boolean;
        destination?: string;
    } = { cleared: false, closed: false };

    function configure(session: { user: unknown; clearUser?: () => void }) {
        session.clearUser = session.clearUser ?? (() => (state.cleared = true));
        TestBed.configureTestingModule({
            providers: [
                { provide: UserSession, useValue: session },
                {
                    provide: MatDialog,
                    useValue: { closeAll: () => (state.closed = true) },
                },
                {
                    provide: Router,
                    useValue: {
                        navigateByUrl: (url: string) => (state.destination = url),
                    },
                },
            ],
        });
    }

    function run(
        request: HttpRequest<unknown>,
        handler: HttpHandlerFn = () =>
            throwError(() => new Error('unexpected request'))
    ) {
        return TestBed.runInInjectionContext(() =>
            authInterceptor(request, handler)
        );
    }

    beforeEach(() => {
        state.cleared = false;
        state.closed = false;
        state.destination = undefined;
    });

    for (const status of [401, 403, 500]) {
        it('handles HTTP ' + status, () => {
            configure({ user: null });
            const error = new HttpErrorResponse({ status });
            let received: unknown;
            run(new HttpRequest('GET', '/api/v1/token'), () =>
                throwError(() => error)
            ).subscribe({
                error: (value) => (received = value),
            });
            expect(received).toBe(error);
            expect(state.cleared).toBe(status !== 500);
            expect(state.closed).toBe(status !== 500);
            expect(state.destination).toBe(
                status === 500 ? undefined : '/' + status
            );
        });
    }

    it('attaches the session token to API requests', () => {
        configure({ user: { accessToken: 'abc' } });
        let sent: HttpRequest<unknown>;
        run(new HttpRequest('GET', '/api/v1/rooms'), (req) => {
            sent = req;
            return throwError(() => new Error('stop'));
        }).subscribe({ error: () => undefined });
        expect(sent.headers.get('Authorization')).toBe('Bearer abc');
    });

    it('does not attach a token to the login request', () => {
        configure({ user: { accessToken: 'abc' } });
        let sent: HttpRequest<unknown>;
        run(new HttpRequest('POST', '/api/v1/token', null), (req) => {
            sent = req;
            return throwError(() => new Error('stop'));
        }).subscribe({ error: () => undefined });
        expect(sent.headers.has('Authorization')).toBe(false);
    });

    it('strips a trailing slash from the configured origin', () => {
        const originalOrigin = environment.apiOrigin;
        environment.apiOrigin = 'https://backend.example/';
        try {
            configure({ user: { accessToken: 'abc' } });
            let sent: HttpRequest<unknown>;
            run(
                new HttpRequest(
                    'GET',
                    'https://backend.example/api/v1/rooms'
                ),
                (req) => {
                    sent = req;
                    return throwError(() => new Error('stop'));
                }
            ).subscribe({ error: () => undefined });
            expect(sent.headers.get('Authorization')).toBe('Bearer abc');
        } finally {
            environment.apiOrigin = originalOrigin;
        }
    });
});
