import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserRoomComponent } from './add-user-room.component';

describe('AddUserRoomComponent', () => {
  let component: AddUserRoomComponent;
  let fixture: ComponentFixture<AddUserRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserRoomComponent ]
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
