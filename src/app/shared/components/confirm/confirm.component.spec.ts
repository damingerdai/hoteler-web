import { NgModule } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { A11yModule } from '@angular/cdk/a11y';

import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogTestModule
      ],
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

  it('should create', () => {
    const fixture = TestBed.createComponent(ConfirmComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
    const h2 = fixture.debugElement.query(By.css('h2'))!.nativeElement as HTMLDivElement;
    expect(h2.innerText).toBe('confirm');
    const content = fixture.debugElement.query(By.directive(MatDialogContent))!.nativeElement as HTMLDialogElement;
    expect(content).not.toBeNull();
    expect(content.innerText.trim()).toBe('confirm description');
  });
});

const TEST_DIRECTIVES = [
  ConfirmComponent,
];

@NgModule({
  imports: [
    ...TEST_DIRECTIVES
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    NoopAnimationsModule,

    A11yModule,
    ...TEST_DIRECTIVES
  ],
})
class DialogTestModule { }
