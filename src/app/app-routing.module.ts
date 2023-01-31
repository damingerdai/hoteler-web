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
        title: 'Hoteler Portal -- 登录',
        loadChildren: () => import('./routes/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'register',
        title: 'Hoteler Portal -- 注册',
        loadChildren: () => import('./routes/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'dashboard',
        title: 'Hoteler Portal -- 主页',
        canLoad: [AuthGuard],
        canActivate:  [AuthGuard],
        loadChildren: () => import('./routes/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'room',
        title: 'Hoteler Portal -- 房间管理',
        canLoad: [AuthGuard],
        canActivate:  [AuthGuard],
        loadChildren: () => import('./routes/room/room.module').then(m => m.RoomModule)
      },
      {
        path: 'customer',
        title: 'Hoteler Portal -- 客户管理',
        canLoad: [AuthGuard],
        canActivate:  [AuthGuard],
        loadChildren: () => import('./routes/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'settings',
        title: 'Hoteler Portal -- 设置',
        loadChildren: () => import('./routes/settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: '403',
        title: 'Hoteler Portal',
        loadChildren: () => import('./routes/forbidden/forbidden.module').then(m => m.ForbiddenModule)
      },
      {
        path: '401',
        title: 'Hoteler Portal',
        loadChildren: () => import('./routes/unauthorized/unauthorized.module').then(m => m.UnauthorizedModule)
      },
      {
        path: '404',
        title: 'Hoteler Portal',
        loadChildren: () => import('./routes/not-found/not-found.module').then(m => m.NotFoundModule)
      }
    ]
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
