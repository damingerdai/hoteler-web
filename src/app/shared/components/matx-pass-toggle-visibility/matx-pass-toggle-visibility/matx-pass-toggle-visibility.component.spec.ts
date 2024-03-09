import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatxPassToggleVisibilityComponent } from './matx-pass-toggle-visibility.component';

describe('MatxPassToggleVisibilityComponent', () => {
  let component: MatxPassToggleVisibilityComponent;
  let fixture: ComponentFixture<MatxPassToggleVisibilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatxPassToggleVisibilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatxPassToggleVisibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
