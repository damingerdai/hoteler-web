import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Github } from './github';

describe('Github', () => {
  let component: Github;
  let fixture: ComponentFixture<Github>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Github]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Github);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
