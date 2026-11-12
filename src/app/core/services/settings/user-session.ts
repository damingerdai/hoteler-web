import { Service, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser, IUserToken } from '../../models';
import { LocalStorage } from '../local-storage';

export type SessionUser = Readonly<IUser>;

@Service()
export class UserSession {
    private readonly storage = inject(LocalStorage);
    private readonly state = new BehaviorSubject<SessionUser | null>(
        this.restore()
    );

    readonly user$ = this.state.asObservable();

    get user(): SessionUser | null {
        return this.state.value;
    }

    get isAuthenticated(): boolean {
        return this.user !== null;
    }

    /** Publish a session only after both authentication and profile loading succeed. */
    start(user: IUser, token: IUserToken): void {
        const session = { ...user, ...token };
        if (!this.isSession(session)) {
            throw new Error('Invalid user session');
        }
        this.commit(session);
    }

    clearUser(): void {
        this.commit(null);
    }

    private commit(user: SessionUser | null): void {
        const snapshot = user ? Object.freeze(structuredClone(user)) : null;
        try {
            if (snapshot) {
                this.storage.set('user', snapshot);
            } else {
                this.storage.remove('user');
            }
        } finally {
            // Logout must clear memory even when browser storage is unavailable.
            this.state.next(snapshot);
        }
    }

    private restore(): SessionUser | null {
        try {
            const user = this.storage.get<unknown>('user');
            return this.isSession(user)
                ? Object.freeze(structuredClone(user))
                : null;
        } catch {
            return null;
        }
    }

    private isSession(value: unknown): value is IUser {
        if (!value || typeof value !== 'object') {
            return false;
        }
        const user = value as Partial<IUser>;
        return (
            typeof user.id === 'string' &&
            user.id.length > 0 &&
            typeof user.username === 'string' &&
            user.username.length > 0 &&
            typeof user.accessToken === 'string' &&
            user.accessToken.length > 0 &&
            typeof user.refreshToken === 'string' &&
            user.refreshToken.length > 0 &&
            typeof user.exp === 'number' &&
            Number.isFinite(user.exp)
        );
    }
}
