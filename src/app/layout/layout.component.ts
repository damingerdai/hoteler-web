import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../core/services/settings/settings.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public get username() {
    return this.settings.user?.username;
  }

  constructor(
    private settings: SettingsService
  ) { }

  ngOnInit() {
  }

}
