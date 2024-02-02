import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { runOnPushChangeDetection } from '../../testings/fixture';

import { ErrorCodeComponent } from './error-code.component';
import { RouterTestingModule } from '@angular/router/testing';


describe('ErrorCodeComponent', () => {
  let component: ErrorCodeComponent;
  let fixture: ComponentFixture<ErrorCodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ErrorCodeComponent
       ]
    })
    .compileComponents();
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
    component.code = '401';
    runOnPushChangeDetection(fixture);
    tick();
    const errorCodeEl = fixture.debugElement.query(By.css('.hoteler-error-code'))!.nativeElement as HTMLDialogElement;
    expect(errorCodeEl.textContent).toContain('401');
  }));

  it('no eletemt stores error title', fakeAsync(() => {
    component.title = '';
    runOnPushChangeDetection(fixture);
    tick();
    const errorCodeEl = fixture.debugElement.query(By.css('.hoteler-error-title'));
    expect(errorCodeEl).not.toBeTruthy();
  }));

  it('error title show no-title if title is not empty', fakeAsync(() => {
    component.title = 'no-title';
    runOnPushChangeDetection(fixture);
    tick();
    const errorCodeEl = fixture.debugElement.query(By.css('.hoteler-error-title'))!.nativeElement as HTMLDialogElement;
    expect(errorCodeEl.textContent).toContain('no-title');
  }));

  it('no eletemt stores error message', fakeAsync(() => {
    component.message = '';
    runOnPushChangeDetection(fixture);
    tick();
    const errorCodeEl = fixture.debugElement.query(By.css('.hoteler-error-message'));
    expect(errorCodeEl).not.toBeTruthy();
  }));

  it('error message show no-message if message is not empty', fakeAsync(() => {
    component.message = 'no-message';
    runOnPushChangeDetection(fixture);
    tick();
    const errorCodeEl = fixture.debugElement.query(By.css('.hoteler-error-message'))!.nativeElement as HTMLDialogElement;
    expect(errorCodeEl.textContent).toContain('no-message');
  }));
});
