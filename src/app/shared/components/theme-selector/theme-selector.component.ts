import { afterNextRender, ChangeDetectorRef, Component, Inject, inject } from '@angular/core';
import { SiteTheme, SiteThemes, ThemeStorageService } from '../theme-storage/theme-storage.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Meta } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { StyleManagerService } from 'src/app/core/services/style-manager/style-manager.service';
import { filter } from 'rxjs';

@Component({
    selector: 'app-theme-selector',
    imports: [MatButtonModule, MatTooltipModule, MatMenuModule, MatIconModule],
    templateUrl: './theme-selector.component.html',
    styleUrl: './theme-selector.component.scss'
})
export class ThemeSelectorComponent {

  currentTheme: SiteTheme;

  themes: SiteThemes = [];

  private styleManager = inject(StyleManagerService);
  private themeStorage = inject(ThemeStorageService);
  private liveAnnouncer = inject(LiveAnnouncer);
  private metaService = inject(Meta);
  private platform = inject(Platform);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.themes = [...this.themeStorage.allTheme];
    this.currentTheme = this.themes[0];
    const themeName = this.themeStorage.getStoredThemeName();
    const theme = this.themes.find(currentTheme => currentTheme.name === themeName);
    if (themeName && theme) {
      this.doSelectTheme(theme);
    }
    this.themeStorage.onThemeUpdate.pipe(filter(t => !!t)).subscribe(t => {
      const theme = this.themes.find(currentTheme => currentTheme.name === t.name);
      if (theme) {
        this.currentTheme = theme;
      this.cdr.detectChanges();
      }
    });
    afterNextRender(() => {
      if (this.platform.isBrowser && this.platform.IOS && this.platform.SAFARI) {
        this.metaService.addTag({
          name: 'apple-mobile-web-app-capable',
          content: 'yes'
        });
      }

    });
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
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );
    const root = this.document.documentElement;
    const isDark = root.classList.contains('dark');
    if (isDark === theme.isDark) {
      this.doSelectTheme(theme);
      return;
    }
    
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
