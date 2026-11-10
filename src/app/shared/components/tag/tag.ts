import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';

@Component({
    selector: 'app-tag',
    templateUrl: './tag.html',
    styleUrl: './tag.scss',
    imports: [NgClass, MatRippleModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tag {
    @Input()
    public color: 'primary' | 'secondary' | 'tertiary' | 'error' | null = null;

    public get colorClass(): string[] {
        const classes = ['tag'];
        if (this.color) {
            classes.push(`tag-${this.color}`);
        }
        return classes;
    }
}
