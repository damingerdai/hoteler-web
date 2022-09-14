/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'img',
  standalone: true
})
export class ImgDirective {

  constructor({ nativeElement }: ElementRef<HTMLImageElement>) {
    const supports = 'loading' in HTMLImageElement.prototype;

    if (supports) {
      nativeElement.setAttribute('loading', 'lazy');
    }
  }

}
