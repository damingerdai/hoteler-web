import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeSelector } from './theme-selector';
import { ThemeStorage } from '../theme-storage/theme-storage';
import { LocalStorage } from 'src/app/core/services';
import { UserSession } from 'src/app/core/services/settings/user-session';
import { SharedMaterialModule } from '../../shared-material-module';

describe('ThemeSelector', () => {
  let component: ThemeSelector;
  let fixture: ComponentFixture<ThemeSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeSelector],
      providers: [ ThemeStorage, LocalStorage, UserSession, SharedMaterialModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
