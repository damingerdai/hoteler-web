import { Component, DOCUMENT, inject, OnInit, Renderer2, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-toggle-button',
  imports: [
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
})
export class ToggleButtonComponent implements OnInit {


  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  protected isDarkMode = signal(false)

  protected toggleTheme() {
    const newMode = !this.isDarkMode();
    this.isDarkMode.set(newMode);
    this.updateThemeDOM(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  }

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    this.isDarkMode.set(isDark);
    this.updateThemeDOM(isDark);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) { // 仅当用户没手动选死主题时跟随系统
        this.isDarkMode.set(e.matches);
        this.updateThemeDOM(e.matches);
      }
    });
  }

  private updateThemeDOM(isDark: boolean) {
    if (isDark) {
      this.renderer.addClass(this.document.documentElement, 'dark-theme');
      this.renderer.setStyle(this.document.documentElement, 'color-scheme', 'dark');
    } else {
      this.renderer.removeClass(this.document.documentElement, 'dark-theme');
      this.renderer.setStyle(this.document.documentElement, 'color-scheme', 'light');
    }
  }
}
