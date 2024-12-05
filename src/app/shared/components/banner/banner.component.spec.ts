import { TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BannerComponent } from './banner.component';

describe('BannerComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ BannerComponent ]
    })
    .compileComponents();
  }));

  it('text should be \'hello\'', () => {
    const fixture = TestBed.createComponent(BannerComponent);
    const component = fixture.componentInstance;
    component.text = 'hello';
    fixture.detectChanges();
    const bannerEl = fixture.debugElement.query(By.css('.banner'));
    expect(bannerEl).toBeTruthy();
    expect((bannerEl.nativeElement as HTMLDivElement).textContent).toContain('hello');
  });
});
