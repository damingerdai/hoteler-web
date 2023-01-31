import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ComponentRef, Directive, Input, OnChanges, Renderer2, SimpleChanges, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  selector: `button[mat-button][loading],
             button[mat-raised-button][loading],
             button[mat-stroked-button][loading],
             button[mat-flat-button][loading],
             button[mat-icon-button][loading],
             button[mat-fab][loading],
             button[mat-mini-fab][loading]`,
})
export class ButtonLoadingDirective implements OnChanges {

  private spinner!: ComponentRef<MatProgressSpinner> | null;

  @Input()
  get loading(): boolean {
    return this._loading;
  }
  set loading(value: boolean) {
    this._loading = coerceBooleanProperty(value);
  }
  private _loading = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled = false;

  @Input()
  color: ThemePalette;

  constructor(
    private matButton: MatButton,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.loading) {
      return;
    }

    if (changes.loading.currentValue) {
      this.matButton._elementRef.nativeElement.classList.add('mat-mdc-button-loading');
      this.matButton.disabled = true;
      this.createSpinner();
    } else if (!changes.loading.firstChange) {
      this.matButton._elementRef.nativeElement.classList.remove('mat-mdc-button-loading');
      this.matButton.disabled = this.disabled;
      this.destroySpinner();
    }
  }

  private createSpinner(): void {
    if (!this.spinner) {
      this.spinner = this.viewContainerRef.createComponent(MatProgressSpinner);
      this.spinner.instance.color = this.color;
      this.spinner.instance.diameter = 20;
      this.spinner.instance.mode = 'indeterminate';
      this.renderer.appendChild(
        this.matButton._elementRef.nativeElement,
        this.spinner.instance._elementRef.nativeElement
      );
    }
  }

  private destroySpinner(): void {
    if (this.spinner) {
      this.spinner.destroy();
      this.spinner = null;
    }
  }


}
