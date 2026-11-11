import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.html',
  styleUrl: './logo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class Logo {
  @HostBinding('attr.aria-hidden')
  ariaHidden = true;
}
