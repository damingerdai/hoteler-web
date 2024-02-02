import { Routes } from '@angular/router';

import { ForbiddenComponent } from './forbidden.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ForbiddenComponent
  }
];
