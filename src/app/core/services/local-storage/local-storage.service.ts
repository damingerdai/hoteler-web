import { Injectable } from '@angular/core';
import { CoreModule } from '../../core.module';

@Injectable({
  providedIn: CoreModule
})
export class LocalStorageService {

  constructor() { }

  get(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  set(key: string, value: any): boolean {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
