import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxPassToggleVisibility } from './matx-pass-toggle-visibility/matx-pass-toggle-visibility';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatxPassToggleVisibility,
    ],
    exports: [MatxPassToggleVisibility],
})
export class MatxPassToggleVisibilityModule {}
