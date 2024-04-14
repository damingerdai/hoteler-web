import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CoreModule } from '../../core.module';
import { IUser, IUserToken } from '../../models';
import { LocalStorageService } from '../local-storage';

@Injectable({
  providedIn: CoreModule
})
export class SettingsService {

  // eslint-disable-next-line no-underscore-dangle,id-blacklist,id-match
  private _user: Partial<IUser>;
  private userSource = new Subject<Partial<IUser>>();
  public user$ = this.userSource.asObservable();

  private _m3: boolean;
  public m3Source = new Subject<boolean>();
  public m3$ = this.m3Source.asObservable();

  // eslint-disable-next-line no-underscore-dangle, id-blacklist, id-match
  public set user(user: Partial<IUser>) {
    const exitUser = this.localStorageService.get<Partial<IUser>>('user') ?? {};
    this._user = {
      ...exitUser,
      ...user,
    };
    this.localStorageService.set('user', user);
    this.userSource.next(user);
  }

  public get user() {
    if (!this._user) {
      this._user = this.localStorageService.get<Partial<IUser>>('user');
    }
    if (!this._user) {
      this._user = {};
    }
    return this._user;
  }

  public saveToken(token: IUserToken) {
    const user = this.localStorageService.get<Partial<IUser>>('user') ?? {};
    user.accessToken = token.accessToken;
    user.refreshToken =  token.refreshToken;
    user.exp =  token.exp;
    this._user = user;
    this.localStorageService.set('user', user);
  }

  constructor(
    private localStorageService: LocalStorageService
  ) {
    const user = this.localStorageService.get<Partial<IUser>>('user');
    if (user) {
      this._user = user;
    }
  }

  public clearUser() {
    this.user = null;
    this.localStorageService.remove('user');
  }


}
