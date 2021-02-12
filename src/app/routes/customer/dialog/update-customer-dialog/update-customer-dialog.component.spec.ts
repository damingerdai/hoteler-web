import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerDialogComponent } from './update-customer-dialog.component';

describe('UpdateCustomerDialogComponent', () => {
  let component: UpdateCustomerDialogComponent;
  let fixture: ComponentFixture<UpdateCustomerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCustomerDialogComponent ]
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
