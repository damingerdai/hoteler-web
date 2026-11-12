import {
    HttpErrorResponse,
    HttpHandler,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { UserSession } from '../services/settings/user-session';
import { SessionNavigation } from '../services/settings/session-navigation';
import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
    let interceptor: AuthInterceptor;
    let expired: number;
    let session: { user: { accessToken: string } | null };
    let sent: HttpRequest<unknown>;

    beforeEach(() => {
        expired = 0;
        session = { user: { accessToken: 'current' } };
        TestBed.configureTestingModule({
            providers: [
                AuthInterceptor,
                { provide: UserSession, useValue: session },
                {
                    provide: SessionNavigation,
                    useValue: {
                        expire: () => {
                            expired++;
                        },
                    },
                },
            ],
        });
        interceptor = TestBed.inject(AuthInterceptor);
    });

    function send(url: string, status?: number, authorization?: string) {
        const request = new HttpRequest('GET', url, {
            headers: undefined,
        });
        const input = authorization
            ? request.clone({ setHeaders: { Authorization: authorization } })
            : request;
        const failure = new HttpErrorResponse({ status });
        const handler: HttpHandler = {
            handle: (req) => {
                sent = req;
                return status
                    ? throwError(() => failure)
                    : of(new HttpResponse());
            },
        };
        let received: unknown;
        interceptor.intercept(input, handler).subscribe({
            error: (error) => {
                received = error;
            },
        });
        if (status) expect(received).toBe(failure);
    }

    it('adds credentials to backend API requests', () => {
        send('/api/v1/users');
        expect(sent.headers.get('Authorization')).toBe('Bearer current');
    });

    it('does not send credentials to external URLs or unrelated paths', () => {
        for (const url of [
            'https://example.com/api/v1/users',
            '//example.com/api/v1/users',
            '/assets/file',
            '/api-other',
        ]) {
            send(url, 401);
            expect(sent.headers.has('Authorization')).toBe(false);
        }
        expect(expired).toBe(0);
    });

    it('preserves explicit credentials and does not expire another session', () => {
        send('/api/v1/user', 401, 'Bearer explicit');
        expect(sent.headers.get('Authorization')).toBe('Bearer explicit');
        expect(expired).toBe(0);
    });

    it('leaves login failures to the login page', () => {
        send('/api/v1/token?attempt=1', 401);
        expect(sent.headers.has('Authorization')).toBe(false);
        expect(expired).toBe(0);
    });

    it('preserves the session on forbidden responses', () => {
        send('/api/v1/users', 403);
        expect(expired).toBe(0);
        expect(session.user).not.toBeNull();
    });

    it('expires the current session on authenticated unauthorized responses', () => {
        send('/api/v1/users', 401);
        expect(expired).toBe(1);
    });

    it('does not globally redirect anonymous requests', () => {
        session.user = null;
        send('/api/v1/user', 401);
        expect(expired).toBe(0);
    });
});
