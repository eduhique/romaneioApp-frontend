import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ForbiddenComponent } from '@shared/components/forbidden/forbidden.component';
import { InternalErrorComponent } from '@shared/components/internal-error/internal-error.component';

const routes: Routes = [
  {
    path: 'login',
    data: { title: 'Login' },
    loadChildren: () =>
      import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: 'login',
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
        component: InternalErrorComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
