import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreModule } from '../core.module';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable({
  providedIn: CoreModule
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService) {

  }


  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.localStorageService.get('user')) {
      return true;
    }
    return this.router.parseUrl('login');
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.localStorageService.get('user')) {
        return true;
      }
      console.log('canLoad');
      return this.router.parseUrl('login');
  }

}
