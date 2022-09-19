import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CreateCustomerDialogComponent } from './create-customer-dialog.component';

describe('CreateCustomerDialogComponent', () => {
  let component: CreateCustomerDialogComponent;
  let fixture: ComponentFixture<CreateCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TestApp ],
      declarations: [ CreateCustomerDialogComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerDialogComponent);
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
