import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error-code',
  templateUrl: './error-code.component.html',
  styleUrls: ['./error-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    RouterModule,
  ],
  standalone: true,
})
export class ErrorCodeComponent{

  @Input()
  public code = '';
  @Input()
  public title = '';
  @Input()
  public message = '';

  constructor() { }

}
