import { Injectable } from '@angular/core';
import { CoreModule } from '../../core.module';
import { IUser } from '../../models';

@Injectable({
  providedIn: CoreModule
})
export class SettingsService {

  // tslint:disable-next-line: variable-name
  private _user: IUser;

  // tslint:disable-next-line: variable-name
  public set user(_user: IUser) {
    this._user = _user;
  }

  public get user() {
    return this._user;
  }

  constructor() { }
}
