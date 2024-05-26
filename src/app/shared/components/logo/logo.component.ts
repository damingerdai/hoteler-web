import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class LogoComponent {
  @HostBinding('attr.aria-hidden')
  ariaHidden = true;
}
