import { Directive, ElementRef, HostBinding, inject } from '@angular/core';
import { FocusOptions } from '@angular/cdk/a11y';


@Directive({
  selector: '[appCarouselItem]',
  standalone: true,
})
export class CarouselItemDirective implements FocusOptions {

  readonly element = inject(ElementRef<HTMLElement>);

  preventScroll?: boolean;

  @HostBinding('attr.role') readonly role = 'listitem';
  @HostBinding('tabindex') tabindex = '-1';

  focus(): void {
    this.element.nativeElement.focus({ preventScroll: true });
  }

}
