import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToasterContainerComponent } from 'angular-toaster';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, ToasterContainerComponent],
})
export class AppComponent {}
