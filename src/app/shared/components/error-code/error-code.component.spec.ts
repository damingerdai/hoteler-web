import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { runOnPushChangeDetection } from '../../testings/fixture';

import { ErrorCodeComponent } from './error-code.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideRouter, RouterLinkWithHref } from '@angular/router';
import { Component, input } from '@angular/core';

@Component({
  template: '<div>login</div>',
  standalone: true,
})
class LoginComponent { }

describe('ErrorCodeComponent', () => {
  let component: ErrorCodeComponent;
  let fixture: ComponentFixture<ErrorCodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
        ErrorCodeComponent,
      ],
      providers: [
        provideRouter(
         [
          { path: 'login', component: LoginComponent },
         ]
        )
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('error code show 401', fakeAsync(() => {
    fixture.componentRef.setInput('code', '401');
    runOnPushChangeDetection(fixture);
    tick();
    const errorCodeEl = fixture.debugElement.query(
      By.css('.hoteler-error-code')
    )!.nativeElement as HTMLDialogElement;
    expect(errorCodeEl.textContent).toContain('401');
  }));

  it('no eletemt stores error title', fakeAsync(() => {
    fixture.componentRef.setInput('title', '');
    runOnPushChangeDetection(fixture);
    tick();
    const errorTitleEl = fixture.debugElement.query(
      By.css('.hoteler-error-title')
    );
    expect(errorTitleEl).not.toBeTruthy();
  }));

  it('error title show no-title if title is not empty', fakeAsync(() => {
    fixture.componentRef.setInput('title', 'no-title');
    runOnPushChangeDetection(fixture);
    tick();
    const errorTitleEl = fixture.debugElement.query(
      By.css('.hoteler-error-title')
    )!.nativeElement as HTMLDialogElement;
    expect(errorTitleEl.textContent).toContain('no-title');
  }));

  it('no eletemt stores error message', fakeAsync(() => {
    fixture.componentRef.setInput('message', '');
    runOnPushChangeDetection(fixture);
    tick();
    const errorCodeEl = fixture.debugElement.query(
      By.css('.hoteler-error-message')
    );
    expect(errorCodeEl).not.toBeTruthy();
  }));

  it('error message show no-message if message is not empty', fakeAsync(() => {
    fixture.componentRef.setInput('message', 'no-message');
    runOnPushChangeDetection(fixture);
    tick();
    const errorCodeEl = fixture.debugElement.query(
      By.css('.hoteler-error-message')
    )!.nativeElement as HTMLDialogElement;
    expect(errorCodeEl.textContent).toContain('no-message');
  }));

  it('should navigate to the new route on button click', () => {
    const button = fixture.debugElement.query(
      By.directive(RouterLinkWithHref)
    );
    expect(button.properties['href']).toContain('/login');
  });
});
