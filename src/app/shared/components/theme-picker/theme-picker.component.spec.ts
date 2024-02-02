import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';

import { ThemePickerComponent } from './theme-picker.component';
import { ThemeStorageService } from './theme-storage/theme-storage.service';

describe('ThemePickerComponent', () => {
  let component: ThemePickerComponent;
  let fixture: ComponentFixture<ThemePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        TestApp,
        ThemePickerComponent
       ],
      providers: [ ThemeStorageService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@NgModule({
  exports: [
    MatMenuModule,
  ]
})
class TestApp {}
