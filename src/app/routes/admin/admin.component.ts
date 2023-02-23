import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  private _mobileQueryListener: () => void;
  public isMobile: boolean;

  public get mode() {
    return this.isMobile ? 'over' : 'side';
  }

  constructor(
    private media: MediaMatcher,
    private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(
      result => {
        this.isMobile = result.matches;
      }
    );
  }
}
