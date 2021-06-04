import { Injectable } from '@angular/core';
import { CoreModule } from '../../core.module';
import { IUser } from '../../models';

@Injectable({
  providedIn: CoreModule
})
export class SettingsService {

  // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
  private _user: IUser;

  // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
  public set user(_user: IUser) {
    this._user = _user;
  }

  public get user() {
    return this._user;
  }

  constructor() { }
}
