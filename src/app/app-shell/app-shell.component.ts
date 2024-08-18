import { Component } from '@angular/core';
import { NavbarComponent } from '../shared/components';

@Component({
    selector: 'app-app-shell',
    standalone: true,
    imports: [NavbarComponent],
    templateUrl: './app-shell.component.html',
    styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {}
