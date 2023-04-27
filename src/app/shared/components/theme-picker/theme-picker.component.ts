import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { StyleManagerService } from 'src/app/core/services/style-manager/style-manager.service';
import { SiteTheme, SiteThemes, ThemeStorageService } from './theme-storage/theme-storage.service';
import { DOCUMENT } from '@angular/common';

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
      // displayName: 'Indigo & Pink',
      displayName: '靛蓝 & 粉红',
      name: 'indigo-pink',
      isDark: false,
      isDefault: true,
    },
    {
      primary: '#673AB7',
      accent: '#FFC107',
      // displayName: 'Deep Purple & Amber',
      displayName: '深紫 & 琥珀',
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
      // displayName: 'Pink & Blue-grey',
      displayName: '粉色 & 蓝灰',
      name: 'pink-bluegrey',
      isDark: true,
    },
    {
      primary: '#9C27B0',
      accent: '#4CAF50',
      // displayName: 'Purple & Green',
      displayName: '紫色 & 绿色',
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
    @Inject(DOCUMENT) private document: Document,
    private styleManager: StyleManagerService,
    private themeStorage: ThemeStorageService,
    private liveAnnouncer: LiveAnnouncer,
    private metaService: Meta,
    private platform: Platform
  ) {
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
    if (this.platform.ANDROID && this.platform.BLINK) {
      this.metaService.updateTag({
        name: 'theme-color', content: theme.primary
      });
    }
    if (this.platform.TRIDENT) {
      // only for wp
      this.metaService.updateTag({
        name: 'msapplication-navbutton-color', content: theme.primary,
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
