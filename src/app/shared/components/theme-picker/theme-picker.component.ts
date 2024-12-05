import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeSelectorComponent } from '../theme-selector/theme-selector.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-theme-picker',
    templateUrl: './theme-picker.component.html',
    styleUrls: ['./theme-picker.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatTooltipModule, MatMenuModule, MatIconModule, MatButtonModule, ThemeSelectorComponent]
})
export class ThemePickerComponent {


}
