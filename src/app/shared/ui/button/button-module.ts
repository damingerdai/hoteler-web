import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonLoading } from './button-loading';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        ButtonLoading,
    ],
    exports: [ButtonLoading],
})
export class ButtonModule {}
