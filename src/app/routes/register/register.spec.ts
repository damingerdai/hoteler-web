import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { LocalStorage } from 'src/app/core/services';
import { UserSession } from 'src/app/core/services/settings/user-session';
import { ApiTestingModule } from 'src/app/core/testings';

import { NgxDomConfettiModule } from 'ngx-dom-confetti';

import { Register } from './register';
import { provideHotToastConfig } from '@ngxpert/hot-toast';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestApp,
        Register
      ],
      providers: [provideHotToastConfig()],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


@NgModule({
  providers: [
    LocalStorage,
    UserSession
  ],
  exports: [
    BrowserModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterTestingModule,
    NoopAnimationsModule,
    ApiTestingModule,
    NgxDomConfettiModule,
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
class TestApp { }
