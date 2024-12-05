import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatxPassToggleVisibilityComponent } from './matx-pass-toggle-visibility/matx-pass-toggle-visibility.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatxPassToggleVisibilityComponent,
    ],
    exports: [MatxPassToggleVisibilityComponent],
})
export class MatxPassToggleVisibilityModule {}
