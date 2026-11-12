import { TestBed } from '@angular/core/testing';
import { IUser, IUserToken } from '../../models';
import { LocalStorage } from '../local-storage';
import { UserSession } from './user-session';

describe('UserSession', () => {
    const token: IUserToken = {
        accessToken: 'access',
        refreshToken: 'refresh',
        exp: 123,
    };
    const profile = { id: '1', username: 'alice' } as IUser;
    let stored: unknown;
    let service: UserSession;

    function create() {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: LocalStorage,
                    useValue: {
                        get: () => stored,
                        set: (_key: string, value: unknown) => {
                            stored = value;
                        },
                        remove: () => {
                            stored = null;
                        },
                    },
                },
            ],
        });
        return TestBed.inject(UserSession);
    }

    beforeEach(() => {
        stored = null;
    });

    it('starts anonymous and rejects an empty cached user', () => {
        stored = {};
        service = create();
        expect(service.user).toBeNull();
        expect(service.isAuthenticated).toBe(false);
    });

    it('persists a complete session and immediately replays it to subscribers', () => {
        service = create();
        service.start(profile, token);
        let received: unknown;
        const subscription = service.user$.subscribe((value) => {
            received = value;
        });
        expect(received).toEqual({ ...profile, ...token });
        expect(stored).toEqual(received);
        expect(service.isAuthenticated).toBe(true);
        subscription.unsubscribe();
    });

    it('restores an existing complete session', () => {
        stored = { ...profile, ...token };
        service = create();
        expect(service.user).toEqual(stored);
    });

    it('clears both memory and storage on logout', () => {
        service = create();
        service.start(profile, token);
        service.clearUser();
        expect(service.user).toBeNull();
        expect(stored).toBeNull();
        expect(service.isAuthenticated).toBe(false);
    });

    it('replaces the previous account without merging its fields', () => {
        service = create();
        service.start(
            { ...profile, permissions: [{ name: 'old' }] } as IUser,
            token
        );
        service.start({ id: '2', username: 'bob' } as IUser, token);
        expect(service.user.permissions).toBeUndefined();
        expect(service.user.id).toBe('2');
    });
});
