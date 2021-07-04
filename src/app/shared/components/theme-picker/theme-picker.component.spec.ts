import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePickerComponent } from './theme-picker.component';
import { ThemeStorageService } from './theme-storage/theme-storage.service';

describe('ThemePickerComponent', () => {
  let component: ThemePickerComponent;
  let fixture: ComponentFixture<ThemePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemePickerComponent ],
      providers: [ ThemeStorageService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
