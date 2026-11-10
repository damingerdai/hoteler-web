import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';import { MatListModule } from '@angular/material/list';
;
import { Breadcrumb } from 'src/app/shared/components';
import { ThemeSelector } from 'src/app/shared/components/theme-selector/theme-selector';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.html',
    styleUrls: ['./settings.scss'],
    imports: [
        Breadcrumb,
        ThemeSelector,

        MatIconModule,
        MatCardModule,
        MatListModule,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Settings {

}
