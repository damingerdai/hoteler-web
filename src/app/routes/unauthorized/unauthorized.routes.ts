import { Routes } from '@angular/router';
import { UnauthorizedComponent } from './unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UnauthorizedComponent
  }
];
