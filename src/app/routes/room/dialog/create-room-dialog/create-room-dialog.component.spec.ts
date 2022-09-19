import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ApiTestingModule } from 'src/app/core/testings';

import { CreateRoomDialogComponent } from './create-room-dialog.component';

describe('CreateRoomDialogComponent', () => {
  let component: CreateRoomDialogComponent;
  let fixture: ComponentFixture<CreateRoomDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ TestApp ],
      declarations: [ CreateRoomDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRoomDialogComponent);
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
class TestApp {}
