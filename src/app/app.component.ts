import { Component, inject } from '@angular/core';
import { CheckForUpdateService } from './core/pwa/check-for-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  protected checkForUpdateService: CheckForUpdateService = inject(CheckForUpdateService);

  constructor() {
    this.checkForUpdateService.check();
  }
}
