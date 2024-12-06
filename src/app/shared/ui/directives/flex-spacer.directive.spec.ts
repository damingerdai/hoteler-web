import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DirectivesModule } from './directives.module';

// eslint-disable-next-line @angular-eslint/prefer-standalone
@Component({
    template: `
    <nav style="display: flex">
    <div flexSpacer></div>
    </nav>
  `,
   standalone: false

})
export class FlexSpacerDirectiveTestComponent { }

describe('FlexSpacerDirective', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ DirectivesModule ],
      declarations: [ FlexSpacerDirectiveTestComponent ]
      // schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));
  it('div flex-grow style should be 1', () => {
    const fixture = TestBed.createComponent(FlexSpacerDirectiveTestComponent);
    fixture.detectChanges(); // initial binding
    const div = fixture.debugElement.query(By.css('div'))!.nativeElement as HTMLDivElement;
    const flexGrow = div.style.flexGrow;
    fixture.detectChanges();
    console.log(div);
    expect(flexGrow).toBe('1');
  });
});
