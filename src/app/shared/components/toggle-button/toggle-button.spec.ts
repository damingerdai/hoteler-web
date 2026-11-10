import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleButton } from './toggle-button';

describe('ToggleButton', () => {
  let component: ToggleButton;
  let fixture: ComponentFixture<ToggleButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
