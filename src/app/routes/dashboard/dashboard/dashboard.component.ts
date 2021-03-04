import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public chart = { type: 'line'};

  public series = [{
    name: 'sales',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }];

  public title = {
    text: 'Test'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
