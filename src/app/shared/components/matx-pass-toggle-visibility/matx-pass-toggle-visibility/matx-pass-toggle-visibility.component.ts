import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'matx-pass-toggle-visibility',
    templateUrl: './matx-pass-toggle-visibility.component.html',
    styleUrl: './matx-pass-toggle-visibility.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class MatxPassToggleVisibilityComponent {
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
