import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCustomerRoomDialogComponent } from './add-customer-room-dialog.component';

describe('AddCustomerRoomDialogComponent', () => {
  let component: AddCustomerRoomDialogComponent;
  let fixture: ComponentFixture<AddCustomerRoomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCustomerRoomDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCustomerRoomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
