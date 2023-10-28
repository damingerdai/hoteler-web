import { Directive, ElementRef, HostBinding } from '@angular/core';
import { FocusOptions } from '@angular/cdk/a11y';


@Directive({
  selector: '[appCarouselItem]',
})
export class CarouselItemDirective implements FocusOptions {

  preventScroll?: boolean;

  @HostBinding('attr.role') readonly role = 'listitem';
  @HostBinding('tabindex') tabindex = '-1';

  constructor(readonly element: ElementRef<HTMLElement>) {
  }

  focus(): void {
    this.element.nativeElement.focus({ preventScroll: true });
  }

}
