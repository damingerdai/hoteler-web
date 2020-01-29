import { Directive } from '@angular/core';

@Directive({
  selector: '[flexSpacer]'
})
export class FlexSpacerDirective {

  constructor(el: ElementRef) { }

}
