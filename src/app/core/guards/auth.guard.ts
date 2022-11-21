import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { CoreModule } from '..';
import { SettingsService } from '../services/settings/settings.service';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private settings: SettingsService,
    private dialog: MatDialog) {

  }


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.settings.user) {
      return true;
    }
    this.dialog.closeAll();
    return this.router.parseUrl('login');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.settings.user) {
        return true;
      }
      this.dialog.closeAll();
      return this.router.parseUrl('login');
  }

}
