import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiClient } from './api-client';
import {
    provideHttpClient,
    withInterceptorsFromDi,
    withXhr,
} from '@angular/common/http';

describe('ApiClient', () => {
    let service: ApiClient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                ApiClient,
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        });
        service = TestBed.inject(ApiClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
