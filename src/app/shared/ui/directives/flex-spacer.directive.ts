import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
    selector: '[flexSpacer], spacer',
})
export class FlexSpacerDirective {
    private el = inject(ElementRef);

    constructor() {
        // this.render.setStyle(this.el.nativeElement, 'flex-grow', '1');
        this.el.nativeElement.style.customProperty = true;
        this.el.nativeElement.style.flexGrow = '1';
    }
}
