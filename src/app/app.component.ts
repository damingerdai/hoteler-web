import { Component, OnInit, inject, isDevMode } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckForUpdateService } from './core/pwa/check-for-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {

  protected checkForUpdateService: CheckForUpdateService = inject(CheckForUpdateService);

  constructor() {

  }
  ngOnInit(): void {
    if (!isDevMode()) {
      this.checkForUpdateService.check();
    }
  }
}
