import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeSelectorComponent } from 'src/app/shared/components/theme-selector/theme-selector.component';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    SharedMaterialModule,
    ThemeSelectorComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent {



  constructor() {

  }



}
