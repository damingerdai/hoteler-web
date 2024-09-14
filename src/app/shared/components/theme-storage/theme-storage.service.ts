import { EventEmitter, Injectable } from '@angular/core';

export interface SiteTheme {
  name: string;
  displayName?: string;
  color: string;
  background: string;
  isDark?: boolean;
  isDefault?: boolean;
}


export type SiteThemes = Array<SiteTheme>;


@Injectable({
  providedIn: 'root'
})
export class ThemeStorageService {

  static storageKey = 'hoteler-theme-storage-current-name';

  public readonly allTheme: SiteThemes = [
    {
      color: '#ffd9e1',
      displayName: '玫瑰红',
      // displayName: 'Rose & Red',
      name: 'rose-red',
      background: '#fffbff',
      isDark: false,
    },
    {
      color: '#d7e3ff',
      displayName: '天空蓝',
      // displayName: 'Azure & Blue',
      name: 'azure-blue',
      background: '#fdfbff',
      isDefault: true,
      isDark: false,
    },
    {
      color: '#810081',
      displayName: '品红紫',
      // displayName: 'Magenta & Violet',
      name: 'magenta-violet',
      background: '#1e1a1d',
      isDark: true,
    },
    {
      color: '#004f4f',
      displayName: '青柳橙',
      // displayName: 'Cyan & Orange',
      name: 'cyan-orange',
      background: '#191c1c',
      isDark: true,
    },
  ];


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
