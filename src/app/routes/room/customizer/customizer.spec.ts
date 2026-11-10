import { SharedMaterialModule } from '../../../shared/shared-material-module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customizer } from './customizer';

describe('Customizer', () => {
  let component: Customizer;
  let fixture: ComponentFixture<Customizer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SharedMaterialModule, Customizer ],
      declarations: [  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Customizer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
