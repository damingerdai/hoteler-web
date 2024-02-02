import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingShadeComponent } from './loading-shade.component';

describe('LoadingShadeComponent', () => {
  let component: LoadingShadeComponent;
  let fixture: ComponentFixture<LoadingShadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingShadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingShadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
