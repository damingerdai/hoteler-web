import { A11yModule } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiTestingModule } from 'src/app/core/testings';

import { CustomerListComponent } from './customer-list.component';
import { provideRouter } from '@angular/router';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ApiTestingModule,
        TestApp,
        CustomerListComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


@NgModule({
  exports: [
    MatDialogModule,
    MatSnackBarModule,
    NoopAnimationsModule,
    A11yModule
  ]
})
class TestApp { }
