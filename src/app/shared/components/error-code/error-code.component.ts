import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-code',
  templateUrl: './error-code.component.html',
  styleUrls: ['./error-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorCodeComponent implements OnInit {

  @Input()
  public code = '';
  @Input()
  public title = '';
  @Input()
  public message = '';

  constructor() { }

  ngOnInit(): void {
  }

}
