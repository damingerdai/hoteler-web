import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';

import { ThemePicker } from './theme-picker';
import { ThemeStorage } from '../theme-storage/theme-storage';
import { UserSession } from 'src/app/core/services/settings/user-session';
import { LocalStorage } from 'src/app/core/services';

describe('ThemePicker', () => {
  let component: ThemePicker;
  let fixture: ComponentFixture<ThemePicker>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestApp,
        ThemePicker
       ],
      providers: [ ThemeStorage, LocalStorage, UserSession ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePicker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@NgModule({
  exports: [
    MatMenuModule,
  ]
})
class TestApp {}
