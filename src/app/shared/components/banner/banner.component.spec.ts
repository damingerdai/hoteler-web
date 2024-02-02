import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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
    let fixture = TestBed.createComponent(BannerComponent);
    let component = fixture.componentInstance;
    component.text = 'hello';
    fixture.detectChanges();
    const bannerEl = fixture.debugElement.query(By.css('.banner'));
    expect(bannerEl).toBeTruthy();
    console.log(fixture.nativeElement as HTMLDivElement);
    console.log(bannerEl.nativeElement as HTMLDivElement);
    expect((bannerEl.nativeElement as HTMLDivElement).textContent).toContain('hello');
  });
});
