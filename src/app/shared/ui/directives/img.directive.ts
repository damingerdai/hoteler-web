/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
    selector: 'img',
})
export class ImgDirective {
    constructor() {
        const supports = 'loading' in HTMLImageElement.prototype;

        if (supports) {
            const el = inject(ElementRef);
            const nativeElement = el.nativeElement;
            nativeElement.setAttribute('loading', 'lazy');
        }
    }
}
