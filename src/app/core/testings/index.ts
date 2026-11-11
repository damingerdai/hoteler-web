import { CommonModule } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ApiClient } from '../api/api-client';
import {
    provideHttpClient,
    withInterceptorsFromDi,
    withXhr,
} from '@angular/common/http';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [
        ApiClient,
        provideHttpClient(withXhr(), withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ],
})
export class ApiTestingModule {}
