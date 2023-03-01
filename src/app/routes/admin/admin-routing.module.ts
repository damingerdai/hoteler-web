import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        title: 'Hoteler Portal -- 主页',
        // canLoad: [AuthGuard],
        // canActivate:  [AuthGuard],
        loadChildren: () => import('../../routes/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'room',
        title: 'Hoteler Portal -- 房间管理',
        // canLoad: [AuthGuard],
        // canActivate:  [AuthGuard],
        loadChildren: () => import('../../routes/room/room.module').then(m => m.RoomModule)
      },
      {
        path: 'customer',
        title: 'Hoteler Portal -- 客户管理',
        // canLoad: [AuthGuard],
        // canActivate:  [AuthGuard],
        loadChildren: () => import('../../routes/customer/customer.module').then(m => m.CustomerModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
