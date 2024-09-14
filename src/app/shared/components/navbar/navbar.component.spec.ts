import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MatMenuModule } from '@angular/material/menu';

import { LocalStorageService } from 'src/app/core/services';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

import { NavbarComponent } from './navbar.component';
import { ThemeStorageService } from '../theme-storage/theme-storage.service';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        MatMenuModule,
        NavbarComponent
      ],
      providers: [
        SettingsService,
        LocalStorageService,
        ThemeStorageService,
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
