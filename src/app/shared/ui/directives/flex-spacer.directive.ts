import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[flexSpacer]'
})
export class FlexSpacerDirective {

  constructor(private el: ElementRef, private render: Renderer2) {
    // this.render.setStyle(this.el.nativeElement, 'flex-grow', '1');
    this.el.nativeElement.style.customProperty = true;
    this.el.nativeElement.style.flexGrow = '1';
  }

}
