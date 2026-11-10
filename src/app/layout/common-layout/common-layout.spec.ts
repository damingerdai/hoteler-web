import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLayout } from './common-layout';
import { provideRouter, RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CommonLayout', () => {
  let component: CommonLayout;
  let fixture: ComponentFixture<CommonLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CommonLayout, RouterModule ],
      providers: [
        provideAnimationsAsync(),
        provideRouter([]),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
