import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CoreModule } from '../../core.module';
import { IUser } from '../../models';
import { LocalStorageService } from '../local-storage';

@Injectable({
  providedIn: CoreModule
})
export class SettingsService {

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  private _user: Partial<IUser>;
  private userSource = new Subject<Partial<IUser>>();
  public user$ = this.userSource.asObservable();

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  public set user(user: Partial<IUser>) {
    this._user = user;
    this.localStorageService.set('user', user);
    this.userSource.next(user)
  }

  public get user() {
    return this._user;
  }

  constructor(
    private localStorageService: LocalStorageService
  ) { }


}
