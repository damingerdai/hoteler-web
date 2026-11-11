import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxPassToggleVisibility } from './matx-pass-toggle-visibility';

describe('MatxPassToggleVisibility', () => {
  let component: MatxPassToggleVisibility;
  let fixture: ComponentFixture<MatxPassToggleVisibility>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatxPassToggleVisibility]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatxPassToggleVisibility);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
