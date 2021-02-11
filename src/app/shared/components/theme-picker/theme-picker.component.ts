import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StyleManagerService } from 'src/app/core/services/style-manager/style-manager.service';
import { SiteTheme, SiteThemes, ThemeStorageService } from './theme-storage/theme-storage.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemePickerComponent implements OnInit {

  currentTheme: SiteTheme;

  themes: SiteThemes = [
    {
      primary: '#3F51B5',
      accent: '#E91E63',
      displayName: 'Indigo & Pink',
      name: 'indigo-pink',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#673AB7',
      accent: '#FFC107',
      displayName: 'Deep Purple & Amber',
      name: 'deeppurple-amber',
      isDark: false,
    },
    // {
    //   primary: '#FF9800',
    //   accent: '#FF5722',
    //   displayName: 'PWC & Light',
    //   name: 'pwc-light',
    //   isDark: false
    // },
    {
      primary: '#E91E63',
      accent: '#607D8B',
      displayName: 'Pink & Blue-grey',
      name: 'pink-bluegrey',
      isDark: true,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      displayName: 'Purple & Green',
      name: 'purple-green',
      isDark: true,
    },
    // {
    //   primary: '#FF9800',
    //   accent: '#FF5722',
    //   displayName: 'PWC & Dark',
    //   name: 'pwc-dark',
    //   isDark: true
    // },
  ];

  constructor(
    private styleManager: StyleManagerService,
    private themeStorage: ThemeStorageService,
    private liveAnnouncer: LiveAnnouncer
  ) {
    this.currentTheme = this.themes[0];
    const themeName = this.themeStorage.getStoredThemeName();
    if (themeName) {
      this.selectTheme(themeName);
    }
  }

  ngOnInit(): void {
  }

  selectTheme(themeName: string) {
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);

    if (!theme) {
      return;
    }

    this.currentTheme = theme;
    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `assets/${theme.name}.css`);
    }

    if (this.currentTheme) {
      this.liveAnnouncer.announce(`${theme.displayName} theme selected.`, 'polite', 3000);
      this.themeStorage.storeTheme(this.currentTheme);
    }
  }

}
