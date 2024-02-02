import { Component, OnInit } from '@angular/core';
import { SharedMaterialModule } from 'src/app/shared/shared.material.module';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    SharedMaterialModule,
  ]
})
export class SettingsComponent{

  constructor() { }

}
