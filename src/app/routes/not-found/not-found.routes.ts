import { Routes } from '@angular/router';
import { NotFound } from './not-found';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NotFound
  }
];
