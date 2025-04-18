import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  get<T>(key: string): T | null {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as T;
    } else {
      return null;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
