import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeSelector } from '../theme-selector/theme-selector';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-theme-picker',
    templateUrl: './theme-picker.html',
    styleUrls: ['./theme-picker.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatTooltipModule, MatMenuModule, MatIconModule, MatButtonModule, ThemeSelector]
})
export class ThemePicker {


}
