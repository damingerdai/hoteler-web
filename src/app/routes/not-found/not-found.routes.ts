import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];
