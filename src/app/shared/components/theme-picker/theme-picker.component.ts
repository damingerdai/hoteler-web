import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import {NgFor} from '@angular/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { SettingsService } from '../../../core/services/settings/settings.service';
import { StyleManagerService } from '../../../core/services/style-manager/style-manager.service';
import { SiteTheme, SiteThemes, ThemeStorageService } from './theme-storage/theme-storage.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButtonModule, MatTooltipModule, MatMenuModule, MatIconModule, NgFor]
})
export class ThemePickerComponent implements OnInit {

  currentTheme: SiteTheme;

  allTheme: SiteThemes = [
    {
      color: '#ffd9e1',
      displayName: 'Rose & Red',
      name: 'rose-red',
      background: '#fffbff',
      isDark: false,
    },
    {
      color: '#d7e3ff',
      displayName: 'Azure & Blue',
      name: 'azure-blue',
      background: '#fdfbff',
      isDefault: true,
      isDark: false,
    },
    {
      color: '#810081',
      displayName: 'Magenta & Violet',
      name: 'magenta-violet',
      background: '#1e1a1d',
      isDark: true,
    },
    {
      color: '#004f4f',
      displayName: 'Cyan & Orange',
      name: 'cyan-orange',
      background: '#191c1c',
      isDark: true,
    },
  ];

  themes: SiteThemes = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private styleManager: StyleManagerService,
    private themeStorage: ThemeStorageService,
    private liveAnnouncer: LiveAnnouncer,
    private metaService: Meta,
    private platform: Platform,
    private settingService: SettingsService
  ) {
    this.themes = this.allTheme;
    this.currentTheme = this.themes[0];
    const themeName = this.themeStorage.getStoredThemeName();
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);
    if (themeName && theme) {
      this.doSelectTheme(theme);
    }
  }

  ngOnInit(): void {
    if (this.platform.isBrowser && this.platform.IOS && this.platform.SAFARI) {
      this.metaService.addTag({
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      });
    }
  }

  selectTheme(event: MouseEvent, themeName: string) {
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);

    if (!theme) {
      return;
    }
    this.viewTransitionAnimate(event, theme);
  }

  private doSelectTheme(theme: SiteTheme) {

    if (!theme) {
      return;
    }

    this.currentTheme = theme;
    if (theme.isDefault) {
      this.styleManager.removeStyle('theme');
    } else {
      this.styleManager.setStyle('theme', `${theme.name}.css`);
    }

    if (this.currentTheme) {
      this.liveAnnouncer.announce(`${theme.displayName} theme selected.`, 'polite', 3000);
      this.updateThemeColor(theme);

      this.themeStorage.storeTheme(this.currentTheme);
    }
  }


  private updateThemeColor(theme: SiteTheme) {
    if (!this.platform.isBrowser) {
      return;
    }
    this.metaService.updateTag({
      name: 'theme-color', content: theme.color, media: `(prefers-color-scheme: ${theme.isDark ? 'dark' : 'light'})`
    });
    if (this.platform.TRIDENT) {
      // only for wp
      this.metaService.updateTag({
        name: 'msapplication-navbutton-color', content: theme.color
      });
    }
    if (this.platform.IOS && this.platform.SAFARI) {
      this.metaService.updateTag({
        name: 'apple-mobile-web-app-status-bar-style', content: theme.isDark ? 'black' : 'default',
      });
    }
  }

  private viewTransitionAnimate(event: MouseEvent, theme: SiteTheme) {
    if (!this.platform.isBrowser || !('startViewTransition' in this.document)) {
      this.doSelectTheme(theme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      // eslint-disable-next-line no-restricted-globals
      Math.max(x, innerWidth - x),
      // eslint-disable-next-line no-restricted-globals
      Math.max(y, innerHeight - y)
    );
    const root = this.document.documentElement;
    const isDark = root.classList.contains('dark');
    if (isDark === theme.isDark) {
      this.doSelectTheme(theme);
      return;
    }
    // @ts-ignore
    const transition = this.document.startViewTransition(() => {
      root.classList.remove(isDark ? 'dark' : 'light');
      root.classList.add(isDark ? 'light' : 'dark');
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      this.document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
        }
      );
      this.doSelectTheme(theme);
    });
  }
}
