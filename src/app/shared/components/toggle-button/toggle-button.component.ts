import { Component, DOCUMENT, inject, Renderer2, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toggle-button',
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
})
export class ToggleButtonComponent {

  private renderer = inject(Renderer2);
  private document = inject(DOCUMENT);

  protected isDarkMode = signal(false);

  protected toggleTheme() {
    this.isDarkMode.set(!this.isDarkMode());
    this.renderer.setStyle(this.document.documentElement, 'color-scheme', this.isDarkMode() ? 'light' : 'dark');
  }
}
