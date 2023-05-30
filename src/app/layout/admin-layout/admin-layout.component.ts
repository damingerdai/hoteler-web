import { BreakpointObserver, Breakpoints, MediaMatcher } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/core/services/layout';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {

  private _mobileQueryListener: () => void;
  public isMobile: boolean;
  protected open: boolean;

  protected menus = [
    {
      type: 'menu',
      header: '主页',
      items: [
        {
          icon: 'group',
          link: './user',
          line: '用户'
        }
      ]
    },
    {
      type: 'divider'
    },
  ];

  public get mode() {
    return this.isMobile ? 'over' : 'side';
  }

  constructor(
    private media: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
    private layoutService: LayoutService) {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(
      result => {
        this.isMobile = result.matches;
      }
    );
    this.open = false;
    this.layoutService.drawerStatusSource$.subscribe(() => this.open = !this.open);
  }
  ngOnInit(): void {
    this.layoutService.adminlayout(true);
  }
  ngOnDestroy(): void {
    this.layoutService.adminlayout(false);
  }
}
