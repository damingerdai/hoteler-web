import { Injectable } from '@angular/core';

import { Observer } from 'tfontfaceobserver';

@Injectable({
  providedIn: 'root'
})
export class MatIconService {

  private matIconObserver: Observer;

  constructor() {
    this.matIconObserver = new Observer('Material Icons')
  }

  load() {
    return new Promise<void>((resolve, reject) => {
      this.matIconObserver.load().then(() => {
        resolve();
      }).catch(() => {
        reject();
      })
    })
  }
}
