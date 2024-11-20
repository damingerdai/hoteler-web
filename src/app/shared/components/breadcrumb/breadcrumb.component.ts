import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-breadcrumb',
    imports: [
        RouterModule
    ],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {

  url = input<string>();

  label = input<string>();
}
