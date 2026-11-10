import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-page-header',
    templateUrl: './page-header.html',
    styleUrls: ['./page-header.scss'],
    standalone: true,
})
export class PageHeader {
    @Input()
    title: string;
}
