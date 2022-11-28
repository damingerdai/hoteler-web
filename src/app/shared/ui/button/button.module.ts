import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonLoadingDirective } from './button-loading.directive';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  declarations: [ButtonLoadingDirective],
  exports: [ButtonLoadingDirective],
})
export class ButtonModule {}
