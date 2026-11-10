import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Banner } from './banner';

describe('Banner', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ Banner ]
    })
    .compileComponents();
  }));

  it('text should be \'hello\'', () => {
    const fixture = TestBed.createComponent(Banner);
    const component = fixture.componentInstance;
    component.text = 'hello';
    fixture.detectChanges();
    const bannerEl = fixture.debugElement.query(By.css('.banner'));
    expect(bannerEl).toBeTruthy();
    expect((bannerEl.nativeElement as HTMLDivElement).textContent).toContain('hello');
  });
});
