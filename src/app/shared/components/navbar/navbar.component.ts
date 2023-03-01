import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/core/models';
import { LayoutService } from 'src/app/core/services/layout';
import { SettingsService } from '../../../core/services/settings/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public isMobile: boolean;

  public showMenu: boolean = false;

  private _user: IUser;

  public get user() {
    return this._user;
  }

  public get username() {
    return this._user?.username;
  }

  public get isAdmin() {
    return this._user?.roles?.map(r => r.name).includes('admin');
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private settings: SettingsService,
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    protected layoutService: LayoutService
  ) {
    const subscription1 = this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(
      result => {
        this.isMobile = result.matches;
      }
    );
    this.subscriptions.push(subscription1);
    const subscription2 = this.settings.user$.subscribe(user => this._user = { ...user } as IUser);
    this.subscriptions.push(subscription2);
    const subscription3 = this.layoutService.adminlayoutSource$.subscribe(b => {
      this.showMenu = b;
    });
    this.subscriptions.push(subscription3);

    this.iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/github-circle-white-transparent.svg'));
  }


  ngOnInit(): void {
    // this._username = this.settings.user?.username;
    this._user = this.settings.user as IUser;
  }

  ngOnDestroy(): void {
    if (this.subscriptions?.length > 0) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

  public logout() {
    this.settings.user = null;
    this.router.navigateByUrl('login');
  }

  public toggle() {
    this.layoutService.drawerStatus(true);
  }

}
