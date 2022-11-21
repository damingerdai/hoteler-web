import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { ButtonLoadingDirective } from './button-loading.directive';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  declarations: [ButtonLoadingDirective],
  exports: [ButtonLoadingDirective],
})
export class ButtonModule {}
