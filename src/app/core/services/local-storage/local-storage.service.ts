import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CoreModule } from '../../core.module';

@Injectable({
  providedIn: CoreModule
})
export class LocalStorageService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
  ) { }

  get<T>(key: string): T | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    } else {
      return null;
    }
  }

  set(key: string, value: any): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  remove(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  clear() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
