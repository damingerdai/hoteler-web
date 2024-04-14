import { EventEmitter, Injectable } from '@angular/core';

export interface SiteM2Theme {
  name: string;
  displayName?: string;
  accent: string;
  primary: string;
  isDark?: boolean;
  isDefault?: boolean;
  type: 'm2'
}

export interface SiteM3Theme {
  name: string;
  displayName?: string;
  color: string;
  background: string;
  isDark?: boolean;
  isDefault?: boolean;
  type: 'm3'
}

export type SiteTheme = SiteM2Theme | SiteM3Theme;

export type SiteThemes = Array<SiteTheme>;

@Injectable()
export class ThemeStorageService {

  static storageKey = 'hoteler-theme-storage-current-name';

  onThemeUpdate: EventEmitter<SiteTheme> = new EventEmitter<SiteTheme>();

  constructor() { }

  storeTheme(theme: SiteTheme) {
    try {
      window.localStorage[ThemeStorageService.storageKey] = theme.name;
    } catch (err) {
      console.error(err);
    }

    this.onThemeUpdate.emit(theme);
  }

  getStoredThemeName(): string | null {
    try {
      return window.localStorage[ThemeStorageService.storageKey] || null;
    } catch {
      return null;
    }
  }

  clearStorage() {
    try {
      window.localStorage.removeItem(ThemeStorageService.storageKey);
    } catch (err) {
      console.error(err);
    }
  }
}
