import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component'

const routes: Routes = [
  {
    path: 'user',
    pathMatch: 'full',
    redirectTo: 'user/auth/log-in'
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
