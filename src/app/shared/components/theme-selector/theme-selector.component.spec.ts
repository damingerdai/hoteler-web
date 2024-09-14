import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSelectorComponent } from './theme-selector.component';
import { ThemeStorageService } from '../theme-storage/theme-storage.service';
import { LocalStorageService } from 'src/app/core/services';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { SharedMaterialModule } from '../../shared.material.module';

describe('ThemeSelectorComponent', () => {
  let component: ThemeSelectorComponent;
  let fixture: ComponentFixture<ThemeSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSelectorComponent],
      providers: [ ThemeStorageService, LocalStorageService, SettingsService, SharedMaterialModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
