import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'login',
        loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'dashboard',
        canLoad: [AuthGuard],
        loadChildren: () => import('./routes/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'room',
        canLoad: [AuthGuard],
        loadChildren: () => import('./routes/room/room.module').then(m => m.RoomModule)
      },
      {
        path: 'customer',
        canLoad: [AuthGuard],
        loadChildren: () => import('./routes/customer/customer.module').then(m => m.CustomerModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
