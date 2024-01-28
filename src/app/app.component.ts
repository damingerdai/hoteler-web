import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CheckForUpdateService } from './core/pwa/check-for-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent {

  protected checkForUpdateService: CheckForUpdateService = inject(CheckForUpdateService);

  constructor() {
    this.checkForUpdateService.check();
  }
}
