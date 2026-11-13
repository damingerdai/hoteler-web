import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { authInterceptor } from '../../interceptors';
import { UserSession } from '../settings/user-session';
import { environment } from '../../../../environments/environment';
import { RoomData } from './room-data';

describe('RoomData authentication', () => {
    let service: RoomData;
    let http: HttpTestingController;
    const originalOrigin = environment.apiOrigin;

    beforeEach(() => {
        environment.apiOrigin = '';
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(withInterceptors([authInterceptor])),
                provideHttpClientTesting(),
                {
                    provide: UserSession,
                    useValue: { user: { accessToken: 'room-token' } },
                },
                { provide: MatDialog, useValue: {} },
                { provide: Router, useValue: {} },
            ],
        });
        service = TestBed.inject(RoomData);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        environment.apiOrigin = originalOrigin;
        http.verify();
    });

    it('attaches the session token to every room endpoint', () => {
        service.list().subscribe();
        service.create({ roomname: '101', price: '100' }).subscribe();
        service
            .update({ id: 1, roomname: '101', price: '100', status: 1 })
            .subscribe();
        service.delete(1).subscribe();
        service.getRoomStatusStat().subscribe();
        const requests = http.match(() => true);
        expect(requests.length).toBe(5);
        for (const request of requests) {
            expect(request.request.url.startsWith('/api/')).toBe(true);
            expect(request.request.headers.get('Authorization')).toBe(
                'Bearer room-token'
            );
            request.flush({});
        }
    });

    it('attaches the token when a backend origin is configured', () => {
        environment.apiOrigin = 'https://backend.example';
        service.list().subscribe();
        const request = http.expectOne('https://backend.example/api/v1/rooms');
        expect(request.request.headers.get('Authorization')).toBe(
            'Bearer room-token'
        );
        request.flush({});
    });
});
