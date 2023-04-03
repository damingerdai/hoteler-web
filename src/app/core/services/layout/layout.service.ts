import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CoreModule } from '../../core.module';

/**
 * @deprecated 已经废弃使用，将来会删除
 */
@Injectable({
  providedIn: CoreModule
})
export class LayoutService {

  private _drawerStatus = false;

  private _adminlayoutSource = new Subject<boolean>();

  private _drawerStatusSource = new Subject<boolean>();

  public adminlayoutSource$ = this._adminlayoutSource.asObservable();

  public drawerStatusSource$ = this._drawerStatusSource.asObservable();

  constructor() { }

  public adminlayout(b: boolean) {
    this._adminlayoutSource.next(b);
  }

  public drawerStatus(b: boolean) {
    this._drawerStatusSource.next(b);
  }
}
