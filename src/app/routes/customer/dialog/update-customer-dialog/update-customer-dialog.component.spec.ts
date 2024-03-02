import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { UpdateCustomerDialogComponent } from './update-customer-dialog.component';

describe('UpdateCustomerDialogComponent', () => {
  let component: UpdateCustomerDialogComponent;
  let fixture: ComponentFixture<UpdateCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TestApp, UpdateCustomerDialogComponent ],
      declarations: [ ],
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
