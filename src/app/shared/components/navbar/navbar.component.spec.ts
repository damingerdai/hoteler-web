import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorageService } from 'src/app/core/services';
import { LayoutService } from 'src/app/core/services/layout';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatMenuModule
       ],
      declarations: [ NavbarComponent ],
      providers: [ SettingsService, LocalStorageService, LayoutService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
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
