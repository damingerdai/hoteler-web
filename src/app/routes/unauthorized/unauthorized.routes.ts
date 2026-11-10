import { Routes } from '@angular/router';
import { Unauthorized } from './unauthorized';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Unauthorized
  }
];
