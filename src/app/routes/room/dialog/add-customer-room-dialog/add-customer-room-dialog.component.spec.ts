import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiTestingModule } from 'src/app/core/testings';

import { AddCustomerRoomDialogComponent } from './add-customer-room-dialog.component';

describe('AddCustomerRoomDialogComponent', () => {
  let component: AddCustomerRoomDialogComponent;
  let fixture: ComponentFixture<AddCustomerRoomDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TestApp],
      declarations: [AddCustomerRoomDialogComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            id: '1',
            roomname: 'test-room',
            price: 200,
            status: 'inused'
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@NgModule({
  exports: [
    CommonModule,
    ApiTestingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    NoopAnimationsModule
  ]
})
class TestApp { }
