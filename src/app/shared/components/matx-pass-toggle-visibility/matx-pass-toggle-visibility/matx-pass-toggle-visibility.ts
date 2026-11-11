import {
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'matx-pass-toggle-visibility',
    templateUrl: './matx-pass-toggle-visibility.html',
    styleUrl: './matx-pass-toggle-visibility.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [MatButtonModule, MatIconModule, MatRippleModule],
})
export class MatxPassToggleVisibility {
    @Input()
    protected tabindex: string | null;

    @Input()
    protected visible: boolean;

    public get type(): string {
        return this.visible ? 'text' : 'password';
    }

    constructor() {
        this.visible = false;
        this.tabindex = null;
    }
}
