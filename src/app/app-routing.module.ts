import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@core/guards/auth.guard';

import { ForbiddenComponent } from '@shared/components/forbidden/forbidden.component';
import { InternalErrorComponent } from '@shared/components/internal-error/internal-error.component';
import { PageNotFoundComponent } from '@shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'dashboard',
    data: { title: 'Dashboard' },
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    data: { title: 'Login' },
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'setup',
    data: { title: 'Configurações' },
    loadChildren: () =>
      import('@pages/setup/setup.module').then(m => m.SetupModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    data: { title: 'Produtos' },
    loadChildren: () =>
      import('@pages/product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'error',
    children: [
      {
        path: 'forbidden',
        data: { title: '403 - Acesso não permitido' },
        component: ForbiddenComponent
      },
      {
        path: 'page-not-found',
        data: { title: '404 - Página não encontrada' },
        component: PageNotFoundComponent
      },
      {
        path: 'internal',
        data: { title: '500 - Erro Interno do Servidor' },
        loadComponent: () => InternalErrorComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'error/page-not-found',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
