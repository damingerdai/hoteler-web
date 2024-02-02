import { Component } from '@angular/core';
import { ErrorCodeComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss'],
  standalone: true,
  imports: [
    ErrorCodeComponent,
  ]
})
export class ForbiddenComponent {

  constructor() { }
}
