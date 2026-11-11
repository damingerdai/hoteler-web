import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Breadcrumb } from './breadcrumb';
import { RouterModule, provideRouter } from '@angular/router';

describe('Breadcrumb', () => {
  let component: Breadcrumb;
  let fixture: ComponentFixture<Breadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, Breadcrumb],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

      fixture = TestBed.createComponent(Breadcrumb);
      component = fixture.componentInstance;
      fixture.componentRef.setInput('url', '/settings');
      fixture.componentRef.setInput('label', 'settings');
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
