import { Routes } from '@angular/router';

import { Forbidden } from './forbidden';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Forbidden
  }
];
