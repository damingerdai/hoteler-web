import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-breadcrumb',
    imports: [
        RouterModule,
        MatIconModule,
        MatButtonModule
    ],
    templateUrl: './breadcrumb.component.html',
    styleUrl: './breadcrumb.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  url = input.required<string>();
  label = input.required<string>();

  parentLabel = input<string>('');
}
