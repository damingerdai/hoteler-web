import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingShade } from './loading-shade';

describe('LoadingShade', () => {
  let component: LoadingShade;
  let fixture: ComponentFixture<LoadingShade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingShade]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingShade);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
