import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[flexSpacer]',
  standalone: true
})
export class FlexSpacerDirective {

  constructor(private el: ElementRef) {
    // this.render.setStyle(this.el.nativeElement, 'flex-grow', '1');
    this.el.nativeElement.style.customProperty = true;
    this.el.nativeElement.style.flexGrow = '1';
  }

}
