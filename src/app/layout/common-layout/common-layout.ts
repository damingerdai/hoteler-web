import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from 'src/app/shared/components';

@Component({
    selector: 'app-common-layout',
    templateUrl: './common-layout.html',
    styleUrls: ['./common-layout.scss'],
    imports: [Navbar, RouterOutlet],
})
export class CommonLayout {}
