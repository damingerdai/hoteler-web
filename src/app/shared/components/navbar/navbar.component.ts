import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  public username: string;

  constructor() { }


  ngOnInit(): void {

  }

}
