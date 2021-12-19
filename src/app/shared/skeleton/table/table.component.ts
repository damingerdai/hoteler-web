import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { stencilFade } from '../animations';

@Component({
  animations: [stencilFade],
  selector: 'app-stencil-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {

  @HostBinding('class') className = 'w-full';

  @Input()
	private readonly loading: boolean;

  constructor() {

  }

  ngOnInit(): void {
     ;
  }

	public get animate(): string {
		return this.loading ? 'effect' : '';
	}

	public get visiblityState(): string {
		return this.loading ? 'show' : 'hide';
	}
}
