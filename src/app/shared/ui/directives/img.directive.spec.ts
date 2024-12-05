import { Component } from '@angular/core';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DirectivesModule } from './directives.module';


@Component({
    template: `
   <img src="https://images.ctfassets.net/ooa29xqb8tix/2KiUooJBmI26N6u5gr2rlm/e2bb070640fe2778e1a58d160335cbe7/React_Hooks_handbook_800x600_cover_new.png?w=400&q=50" />
  `,
    
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestApp { }

describe('ImgDirective', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [DirectivesModule],
      declarations: [ TestApp ],
      // schemas:      [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  }));
  it('set img lazy attribute', () => {
    const fixture = TestBed.createComponent(TestApp);
    const imgEl = fixture.debugElement.query(By.css('img'))!.nativeElement as HTMLImageElement;
    expect(imgEl.hasAttribute('loading')).toBe(true);
  });
});
