import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser, IUserToken } from '../../models';
import { LocalStorageService } from '../local-storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

   
  private _user: Partial<IUser>;
  private userSource = new Subject<Partial<IUser>>();
  public user$ = this.userSource.asObservable();

   
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
