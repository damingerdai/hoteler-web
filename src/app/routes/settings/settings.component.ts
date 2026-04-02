import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';import { MatListModule } from '@angular/material/list';
;
import { BreadcrumbComponent } from 'src/app/shared/components';
import { ThemeSelectorComponent } from 'src/app/shared/components/theme-selector/theme-selector.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    imports: [
        BreadcrumbComponent,
        ThemeSelectorComponent,

        MatIconModule,
        MatCardModule,
        MatListModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {

}
