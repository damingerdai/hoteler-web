import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { runOnPushChangeDetection } from '../../testings/fixture';

import { ErrorCode } from './error-code';
import { provideRouter, RouterLinkWithHref } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    template: '<div>login</div>',
    standalone: true,
})
class Login {}

describe('ErrorCode', () => {
    let component: ErrorCode;
    let fixture: ComponentFixture<ErrorCode>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ErrorCode],
            providers: [
                provideRouter([{ path: 'login', component: Login }]),
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ErrorCode);
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
