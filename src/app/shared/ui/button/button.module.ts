import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLoadingDirective } from './button-loading.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        ButtonLoadingDirective,
    ],
    exports: [ButtonLoadingDirective],
})
export class ButtonModule {}
