import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';

import { LocalStorage } from 'src/app/core/services';
import { UserSession } from 'src/app/core/services/settings/user-session';

import { Navbar } from './navbar';
import { ThemeStorage } from '../theme-storage/theme-storage';
import { provideRouter } from '@angular/router';
import {
    provideHttpClient,
    withInterceptorsFromDi,
    withXhr,
} from '@angular/common/http';

describe('Navbar', () => {
    let component: Navbar;
    let fixture: ComponentFixture<Navbar>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [MatMenuModule, Navbar],
            providers: [
                UserSession,
                LocalStorage,
                ThemeStorage,
                provideRouter([]),
                provideHttpClient(withXhr(), withInterceptorsFromDi()),
                provideHttpClientTesting(),
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(Navbar);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
