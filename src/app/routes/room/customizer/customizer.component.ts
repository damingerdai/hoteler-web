import { DragDropModule } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-customizer',
    templateUrl: './customizer.component.html',
    styleUrls: ['./customizer.component.scss'],
    imports: [
        MatIconModule, MatMenuModule, MatTooltipModule, MatButtonModule, DragDropModule,
    ]
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
