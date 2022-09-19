import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyNativeDateModule as MatNativeDateModule } from '@angular/material/legacy-core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiTestingModule } from 'src/app/core/testings';

import { AddUserRoomComponent } from './add-user-room.component';

describe('AddUserRoomComponent', () => {
  let component: AddUserRoomComponent;
  let fixture: ComponentFixture<AddUserRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestApp
      ],
      declarations: [ AddUserRoomComponent ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {
            open: () => void 0,
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@NgModule({
  exports: [
    BrowserModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    ApiTestingModule,
  ]
})
class TestApp { }
