import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss']
})
export class CustomizerComponent implements OnInit {

  public layouts = [
    {
      name: 'table',
      display: '表格',
      value: 'table'
    },
    {
      name: 'card',
      display: '卡片',
      value: 'card'
    }
  ] as Array<{ name: string; display: string, value:  'table' | 'card'}>;

  @Output()
  public layoutChange = new EventEmitter<'table' | 'card'>();

  constructor() { }

  ngOnInit(): void {
  }

  public changeLayout(layout: 'table' | 'card') {
    this.layoutChange.emit(layout);
  }

}
