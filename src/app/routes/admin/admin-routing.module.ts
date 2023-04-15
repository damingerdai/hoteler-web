import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateFn } from 'src/app/core/guards/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        title: 'Hoteler Portal -- 主页',
        canLoad: [canActivateFn],
        canActivate:  [canActivateFn],
        loadChildren: () => import('../../routes/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'room',
        title: 'Hoteler Portal -- 房间管理',
        canLoad: [canActivateFn],
        canActivate:  [canActivateFn],
        loadChildren: () => import('../../routes/room/room.module').then(m => m.RoomModule)
      },
      {
        path: 'customer',
        title: 'Hoteler Portal -- 客户管理',
        canLoad: [canActivateFn],
        canActivate:  [canActivateFn],
        loadChildren: () => import('../../routes/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'user',
        title: 'Hoteler Portal -- 用户管理',
        canLoad: [canActivateFn],
        canActivate:  [canActivateFn],
        loadChildren: () => import('../../routes/user/user.module').then(m => m.UserModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
