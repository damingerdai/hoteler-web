import { Component, PLATFORM_ID } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync as waitForAsync } from '@angular/core/testing';
import { SKELETON_LOADER_CONFIG } from './skeleton-loader-config.types';

import { SkeletonLoaderComponent } from './skeleton-loader.component';

@Component({
    selector: 'app-container',
    template: `
    <div>
      <div class="skeletons-defaults">
        <app-skeleton-loader></app-skeleton-loader>
      </div>
      <div class="skeleton-with-specific-loading-text">
        <app-skeleton-loader loadingText="Loading. Please wait ..."></app-skeleton-loader>
      </div>
      <div class="skeletons-animation-no-animation">
        <app-skeleton-loader animation="false"></app-skeleton-loader>
      </div>
      <div class="skeletons-animation-no-animation-via-binding">
        <app-skeleton-loader [animation]="animationWithFalsePassedViaBinding"></app-skeleton-loader>
      </div>
      <div class="skeletons-animation-pulse">
        <app-skeleton-loader animation="pulse"></app-skeleton-loader>
      </div>
      <div class="skeletons-animation-progress">
        <app-skeleton-loader animation="progress"></app-skeleton-loader>
      </div>
      <div class="skeletons-animation-progress-dark">
        <app-skeleton-loader animation="progress-dark"></app-skeleton-loader>
      </div>
      <div class="skeletons-animation-invalid-option">
        <app-skeleton-loader animation="invalid-option"></app-skeleton-loader>
      </div>
      <div class="skeletons-count-invalid-option">
        <app-skeleton-loader [count]="invalidValueIncount"></app-skeleton-loader>
      </div>
      <div class="skeletons-appearance-invalid-option">
        <app-skeleton-loader appearance="invalid-appearance"></app-skeleton-loader>
      </div>
      <div class="skeletons-with-count">
        <app-skeleton-loader count="2"></app-skeleton-loader>
      </div>
      <div class="skeletons-appearance-circle">
        <app-skeleton-loader appearance="circle"> </app-skeleton-loader>
      </div>
      <div class="skeletons-appearance-custom-content">
        <app-skeleton-loader appearance="custom-content">
          <svg viewBox="0 0 312 103" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="312" height="102" fill="white"/>
            <path d="M14 49.5338C5.2 43.5338 1 47.3671 0 50.0338V102.034H312V44.5338C312 35.7338 303.667 37.8671 299.5 40.0338C292.167 44.5338 276.3 54.4338 271.5 58.0338C266.7 61.6338 261.833 62.2005 260 62.0338H248C243.2 62.0338 240 60.7005 239 60.0338C237.833 59.2005 233.5 56.0338 225.5 50.0338C217.5 44.0338 210.167 47.2004 207.5 49.5338C204.833 51.8671 197.6 58.0338 190 64.0338C182.4 70.0338 176.833 65.2005 175 62.0338C168.167 48.3671 153.5 19.3338 149.5 12.5338C144.7 6.13377 138.5 9.8671 136 12.5338C130.667 18.3671 118.8 31.3338 114 36.5338C109.2 41.7338 102.667 42.3671 100 42.0338H76C66.5 42.0338 48 56.5338 42 59.0338C37.2 61.0338 32.3333 59.8671 30.5 59.0338C28.6667 58.3671 22.8 55.5338 14 49.5338Z" fill="#EFEFEF"/>
            <path d="M14 49.5338C5.2 43.5338 1 47.3671 0 50.0338V102.034H312V44.5338C312 35.7338 303.667 37.8671 299.5 40.0338C292.167 44.5338 276.3 54.4338 271.5 58.0338C266.7 61.6338 261.833 62.2005 260 62.0338H248C243.2 62.0338 240 60.7005 239 60.0338C237.833 59.2005 233.5 56.0338 225.5 50.0338C217.5 44.0338 210.167 47.2004 207.5 49.5338C204.833 51.8671 197.6 58.0338 190 64.0338C182.4 70.0338 176.833 65.2005 175 62.0338C168.167 48.3671 153.5 19.3338 149.5 12.5338C144.7 6.13377 138.5 9.8671 136 12.5338C130.667 18.3671 118.8 31.3338 114 36.5338C109.2 41.7338 102.667 42.3671 100 42.0338H76C66.5 42.0338 48 56.5338 42 59.0338C37.2 61.0338 32.3333 59.8671 30.5 59.0338C28.6667 58.3671 22.8 55.5338 14 49.5338Z" fill="black" fill-opacity="0.1"/>
          </svg>
        </app-skeleton-loader>
      </div>

      <div class="skeletons-with-theming">
        <app-skeleton-loader appearance="circle" [theme]="{ width: '70px', height: '70px', 'border-radius': '10px' }">
        </app-skeleton-loader>
      </div>
      <div class="skeletons-with-provided-config">
        <app-skeleton-loader></app-skeleton-loader>
      </div>
    </div>
  `,
    imports: [
        SkeletonLoaderComponent
    ]
})
class ContainerComponent {
  animationWithFalsePassedViaBinding = false;
  invalidValueIncount = 'two';
}

describe('SkeletonLoaderComponent', () => {
  let fixture: ComponentFixture<ContainerComponent>;
  beforeEach(() => {
     
    spyOn(console, 'error');
  });

  describe('When the component uses default configuration', () => {
    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.configureTestingModule({
          imports: [ContainerComponent, SkeletonLoaderComponent],
          providers: [{ provide: PLATFORM_ID, useValue: 'browser' }],
        }).createComponent(ContainerComponent);
        fixture.detectChanges();
      }),
    );

    it('should console 3 errors if `animation`, `appearance` and `count` receives invalid options in development mode', () => {
      expect(console.error).toHaveBeenCalledTimes(3);
    });

    it('should console errors if `animation` is an invalid option in development mode', () => {
      expect(console.error).toHaveBeenCalledWith(
        '`SkeletonLoaderComponent` need to receive \'animation\' as: progress, progress-dark, pulse, false. Forcing default to "progress".',
      );
    });

    it('should console errors if `count` is an invalid option in development mode', () => {
      expect(console.error).toHaveBeenCalledWith(
        '`SkeletonLoaderComponent` need to receive \'count\' a numeric value. Forcing default to "1".',
      );
    });

    it('should console errors if `appearance` is an invalid option and is running in development mode', () => {
      expect(console.error).toHaveBeenCalledWith(
        '`SkeletonLoaderComponent` need to receive \'appearance\' as: circle or line or custom-content or empty string. Forcing default to "\'\'".',
      );
    });


    it('should add all relevant WAI-ARIA `aria-` attributes in all ngx-skeleton-loader', () => {
      expect(fixture.nativeElement.querySelectorAll('[aria-busy="true"]').length).toBe(16);
      expect(fixture.nativeElement.querySelectorAll('[aria-valuemin="0"]').length).toBe(16);
      expect(fixture.nativeElement.querySelectorAll('[aria-valuemax="100"]').length).toBe(16);
      expect(fixture.nativeElement.querySelectorAll('[aria-valuetext]').length).toBe(16);
      expect(fixture.nativeElement.querySelectorAll('[role="progressbar"]').length).toBe(16);
      expect(fixture.nativeElement.querySelectorAll('[tabindex="0"]').length).toBe(16);
      expect(fixture.nativeElement.querySelectorAll('[aria-label="loading"]').length).toBe(16);
    });

    it('should use progress as default animation if `animation` is not passed as component attribute', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .skeleton-loader.progress').length).toBe(1);
    });

    describe('When skeleton is created using default settings', () => {
      it('should render a single skeleton', () => {
        expect(fixture.nativeElement.querySelectorAll('.skeletons-defaults .skeleton-loader').length).toBe(1);
      });
    });

    describe('When skeleton is created passing loading text to be used as WAI-ARIA `aria-valuetext`', () => {
      it('should render a single skeleton', () => {
        expect(fixture.nativeElement.querySelectorAll('[aria-valuetext="Loading. Please wait ..."]').length).toBe(1);
      });
    });

    describe('When skeleton is created with count', () => {
      it('should render skeleton based on given count attribute', () => {
        expect(fixture.nativeElement.querySelectorAll('.skeletons-with-count .skeleton-loader').length).toBe(2);
      });
    });

    describe('When skeleton is created with circle appearance', () => {
      it('should add styles based on circle class on the skeleton components', () => {
        expect(fixture.nativeElement.querySelectorAll('.skeletons-appearance-circle .skeleton-loader.circle').length).toBe(1);
      });
    });

    describe('When skeleton is created with custom-content appearance', () => {
      it('should use the content inside', () => {
        expect(fixture.nativeElement.querySelector('.skeletons-appearance-custom-content .skeleton-loader.custom-content').innerHTML.length).toBeGreaterThan(0);
      });
    });

    describe('When skeleton is created without animation', () => {
      it('should NOT add progress animation styles based on animation class on the skeleton components', () => {
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-animation-no-animation .skeleton-loader:not(.animation)').length,
        ).toBe(1);
      });

      it('should NOT add progress animation styles based on animation class if animation value is passed via binding', () => {
        expect(
          fixture.nativeElement.querySelectorAll(
            '.skeletons-animation-no-animation-via-binding .skeleton-loader:not(.animation)',
          ).length,
        ).toBe(1);
      });
    });

    describe('When skeleton is created using `pulse` as animation', () => {
      it('should add pulse animation styles based on animation class on the skeleton components', () => {
        expect(fixture.nativeElement.querySelectorAll('.skeletons-animation-pulse .skeleton-loader.pulse').length).toBe(1);
      });
    });

    describe('When skeleton is created using `progress-dark` as animation', () => {
      it('should add progress-dark animation styles based on animation class on the skeleton components', () => {
        expect(
          fixture.nativeElement.querySelectorAll('.skeletons-animation-progress-dark .skeleton-loader.progress-dark').length,
        ).toBe(1);
      });
    });

    describe('When skeleton is created using `progress` as animation', () => {
      it('should add progress animation styles based on animation class on the skeleton components', () => {
        expect(fixture.nativeElement.querySelectorAll('.skeletons-animation-progress .skeleton-loader.progress').length).toBe(1);
      });
    });

    describe('When skeleton is created with theming', () => {
      it('should render skeleton with styles based on theme attribute', () => {
        const skeletonWithTheming = fixture.nativeElement.querySelector('.skeletons-with-theming .skeleton-loader.circle')
          .attributes as NamedNodeMap;

        expect((skeletonWithTheming.getNamedItem('style') as Attr).value).toBe(
          'width: 70px; height: 70px; border-radius: 10px;',
        );
      });
    });
  });

  describe('When the component receives a different default via module configuration', () => {
    beforeEach(
      waitForAsync(() => {
        fixture = TestBed.configureTestingModule({
          imports: [ContainerComponent, SkeletonLoaderComponent],
          providers: [
            { provide: PLATFORM_ID, useValue: 'browser' },
            { provide: SKELETON_LOADER_CONFIG, useValue: { appearance: 'circle', count: 3 } },
          ],
        }).createComponent(ContainerComponent);
        fixture.detectChanges();
      }),
    );

    it('should render skeleton with the provided config', () => {
      expect(fixture.nativeElement.querySelectorAll('.skeletons-with-provided-config .skeleton-loader.circle').length).toBe(3);
    });
  });
});
