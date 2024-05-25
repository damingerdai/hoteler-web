import { Component, OnInit, inject } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings/settings.service';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    SharedMaterialModule,
  ],
})
export class SettingsComponent{

  private settingsService: SettingsService = inject(SettingsService);

  constructor() { }

  public toggleM3Theme(checked: boolean) {
    
  }

}
