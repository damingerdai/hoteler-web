import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  public isMobile: boolean;

  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(
      result => {
        this.isMobile = result.matches;
      }
    );
  }
}
