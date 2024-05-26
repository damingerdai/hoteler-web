import { CommonModule } from '@angular/common';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ApiService } from '../api/api.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [], imports: [CommonModule], providers: [ApiService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] })
export class ApiTestingModule {}
