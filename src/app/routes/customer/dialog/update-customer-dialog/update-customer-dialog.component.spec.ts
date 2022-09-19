import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UpdateCustomerDialogComponent } from './update-customer-dialog.component';

describe('UpdateCustomerDialogComponent', () => {
  let component: UpdateCustomerDialogComponent;
  let fixture: ComponentFixture<UpdateCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TestApp ],
      declarations: [ UpdateCustomerDialogComponent ],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: 1,
            name: 'test user',
            gender: 'F',
            phone: 12799999
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomerDialogComponent);
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    A11yModule
  ]
})
class TestApp { }
