import { Component } from '@angular/core';
import { waitForAsync, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { By } from '@angular/platform-browser';
import { ButtonLoadingDirective } from './button-loading.directive';
import { ButtonModule } from './button.module';

@Component({
  // eslint-disable-next-line @angular-eslint/prefer-standalone
  standalone: false,
  selector: 'test-app',
  template: `
    <button mat-button [loading]="loading">Test Button</button>
  `,

})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class TestApp {
  public loading = false;
}

describe('ButtonLoadingDirective', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatButtonModule, ButtonModule, ButtonLoadingDirective],
      declarations: [TestApp],
    });

    TestBed.compileComponents();
  }));

  xit('button loading', () => {
    const fixture = TestBed.createComponent(TestApp);
    const testComponent = fixture.debugElement.componentInstance;
    const buttonDebugElement = fixture.debugElement.query(By.css('button'))!;
    const buttonNativeElement = fixture.nativeElement.querySelector('button');
    testComponent.loading = true;
    fixture.detectChanges();
    expect(buttonDebugElement.nativeElement.classList.contains('mat-mdc-button-loading')).toBe(true);
    expect(buttonNativeElement.disabled).withContext('Expected button to be disabled').toBe(true);
    const spinner1 = fixture.debugElement.query(
      By.directive(MatProgressSpinner)
    )!.componentInstance;
    expect(spinner1).withContext('Expected spinner to be existed').toBe(true);

    testComponent.loading = false;
    fixture.detectChanges();
    expect(buttonDebugElement.nativeElement.classList.contains('mat-mdc-button-loading')).toBe(false);
    expect(buttonNativeElement.disabled)
      .withContext('Expected button not to be disabled')
      .toBeFalse();
    const spinner2 = fixture.debugElement.query(
      By.directive(MatProgressSpinner)
    )?.componentInstance;
    expect(spinner2).withContext('Expected spinner to be not existed').toBeFalsy();
  });
});
