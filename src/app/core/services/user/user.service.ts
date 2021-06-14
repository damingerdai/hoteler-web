// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// import { IUser } from '../../models';
// import { LocalStorageService } from '../local-storage';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   private _user: IUser;

//   private userSource = new Subject<IUser>();

//   public get user() {
//     return this._user;
//   }

//   user$ = this.userSource.asObservable();

//   constructor(
//     private localStorageService: LocalStorageService
//   ) { }

//   public setUser(user: IUser) {
//     this._user = user;
//     this.localStorageService.set('user', user);
//     this.userSource.next(user);
//   }

//   public clearUser() {
//     this._user = null;
//     this.localStorageService.remove('user');
//     this.userSource.next(null);
//   }


// }
