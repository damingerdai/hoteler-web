import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SettingsService } from '../../../core/services/settings/settings.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];

  public isMobile: boolean;

  private _username: string;

  public get username() {
    return this._username;
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private settings: SettingsService,
    private router: Router,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    const subscription1 = this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(
      result => {
        this.isMobile = result.matches;
      }
    );
    this.subscriptions.push(subscription1);
    const subscription2 = this.settings.user$.subscribe(user => this._username = user?.username || '');
    this.subscriptions.push(subscription2);

    this.iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('../../../assets/img/github-circle-white-transparent.svg'));
  }


  ngOnInit(): void {
    this._username = this.settings.user?.username;
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

}
