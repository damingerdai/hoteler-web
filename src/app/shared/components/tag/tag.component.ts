import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatRippleModule, ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
  imports: [
    NgClass,
    MatRippleModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent {

  @Input()
  public color: ThemePalette = null;

  public get colorClass(): string[] {
    const classes = ['tag'];
    if (this.color) {
      classes.push(`tag-${this.color}`);
    }
    return classes;
  }
}
