import { Component, NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogContent, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';

import { ConfirmComponent } from './confirm.component';

/** Gets the currently-focused element while accounting for the shadow DOM. */
function getActiveElement() {
  const activeElement = document.activeElement as HTMLElement | null;
  return activeElement?.shadowRoot?.activeElement as HTMLElement || activeElement;
}

describe('ConfirmComponent', () => {
  let dialog: MatDialog;
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogTestModule
      ],
      // declarations: [ConfirmComponent],
      providers: [
        {
          // I was expecting this will pass the desired value
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'confirm',
            description: 'confirm description'
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const h2 = fixture.debugElement.query(By.css('h2'))!.nativeElement as HTMLDivElement;
    expect(h2.innerText).toBe('confirm');
    console.log(fixture.debugElement.query(By.directive(MatDialogContent)));
    const content = fixture.debugElement.query(By.directive(MatDialogContent))!.nativeElement as HTMLDialogElement;
    expect(content.innerText.trim()).toBe('confirm description');
  });

  // xit(' `取消` button is forcus initial', () => {
  //   const button = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement as HTMLButtonElement;
  //   const focusTrapInstance = fixture.componentInstance.focusTrapDirective.focusTrap;
  //   focusTrapInstance.focusInitialElement();
  //   expect(getActiveElement().innerText).toBe(button.innerText);
  // })

  xit('should close dialog when close button clicked', fakeAsync(() => {
    const noop =  TestBed.createComponent(NoopComponent);
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const config = {
      data: {
        title: 'confirm',
        description: 'confirm description'
      }
    };
    const dialogRef = dialog.open(NoopComponent, config);
    noop.detectChanges();
    buttons[0].triggerEventHandler('click', null);
    expect(dialogRef.close).toHaveBeenCalledWith(true);

  }));
});

@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [
  ConfirmComponent,
  NoopComponent
];

@NgModule({
  exports: [
    MatButtonModule,
    MatDialogModule,
    NoopAnimationsModule,

    A11yModule
  ],
  declarations: [...TEST_DIRECTIVES],
})
class DialogTestModule { }
