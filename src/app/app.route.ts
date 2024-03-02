import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivateFn } from './core/guards/auth.guard';
import { AdminLayoutComponent } from './layout/admin-layout';
import { CommonLayoutComponent } from './layout/common-layout';

export const routes: Routes = [
  {
    path: '',
    component: CommonLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'login',
        title: 'Hoteler Portal -- 登录',
        loadChildren: () =>
          import('./routes/login/login.routes').then(
            (r) => r.routes
          ),
      },
      {
        path: 'register',
        title: 'Hoteler Portal -- 注册',
        loadChildren: () =>
          import('./routes/register/register.routes').then(
            (r) => r.routes
          ),
      },
      {
        path: 'dashboard',
        title: 'Hoteler Portal -- 主页',
        canLoad: [canActivateFn],
        canActivate: [canActivateFn],
        loadChildren: () =>
          import('./routes/dashboard/dashboard.routes').then(
            (r) => r.routes
          ),
      },
      {
        path: 'room',
        title: 'Hoteler Portal -- 房间管理',
        canLoad: [canActivateFn],
        canActivate: [canActivateFn],
        loadChildren: () => import('./routes/room/room.routes').then(r => r.routes)
      },
      {
        path: 'customer',
        title: 'Hoteler Portal -- 客户管理',
        canLoad: [canActivateFn],
        canActivate: [canActivateFn],
        loadChildren: () =>
          import('./routes/customer/customer.routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'settings',
        title: 'Hoteler Portal -- 设置',
        loadChildren: () =>
          import('./routes/settings/settings.routes').then(
            (r) => r.routes
          ),
      },
      {
        path: '403',
        title: 'Hoteler Portal -- 403',
        loadChildren: () =>
          import('./routes/forbidden/forbidden.routes').then(
            (r) => r.routes
          ),
      },
      {
        path: '401',
        title: 'Hoteler Portal -- 401',
        loadChildren: () =>
          import('./routes/unauthorized/unauthorized.routes').then(
            (r) => r.routes
          ),
      },
      {
        path: '404',
        title: 'Hoteler Portal -- 404',
        loadChildren: () =>
          import('./routes/not-found/not-found.routes').then((r) => r.routes),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'user',
      },
      {
        path: 'dashboard',
        title: 'Hoteler Portal -- 主页',
        canLoad: [canActivateFn],
        canActivate: [canActivateFn],
        loadChildren: () =>
          import('./routes/dashboard/dashboard.routes').then(
            (r) => r.routes
          ),
      },
      {
        path: 'room',
        title: 'Hoteler Portal -- 房间管理',
        canLoad: [canActivateFn],
        canActivate: [canActivateFn],
        loadChildren: () =>
          import('./routes/room/room.routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'customer',
        title: 'Hoteler Portal -- 客户管理',
        canLoad: [canActivateFn],
        canActivate: [canActivateFn],
        loadChildren: () =>
          import('./routes/customer/customer.routes').then(
            (m) => m.routes
          ),
      },
      {
        path: 'user',
        title: 'Hoteler Portal -- 用户管理',
        canLoad: [canActivateFn],
        canActivate: [canActivateFn],
        loadChildren: () =>
          import('./routes/user/user.module').then(
            (m) => m.UserModule
          ),
      },
      {
        path: 'settings',
        title: 'Hoteler Portal -- 设置',
        canLoad: [canActivateFn],
        canActivate: [canActivateFn],
        loadChildren: () =>
          import('./routes/settings/settings.routes').then(
            (r) => r.routes
          ),
      },
    ],
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableViewTransitions: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
