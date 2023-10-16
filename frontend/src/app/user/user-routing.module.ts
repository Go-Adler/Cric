import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/log-in'
  },
  {
    path: 'auth',
    pathMatch: 'full',
    redirectTo: '/auth/log-in'
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}