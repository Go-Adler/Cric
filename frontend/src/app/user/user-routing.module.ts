import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component'
import { PostLoginComponent } from './post-login/post-login.component'
import { AuthGuard } from '../guards/auth.guard'
import { LogInGuard } from '../guards/logIn.guard'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/auth/log-in'
  },
  {
    path: '',
    pathMatch: 'prefix',
    canActivate: [AuthGuard],
    component: PostLoginComponent,
    loadChildren: () => import('./post-login/post-login.module').then(m => m.PostLoginModule),
  },
  {
    path: 'auth',
    pathMatch: 'full',
    redirectTo: '/auth/log-in'
  },
  {
    path: 'auth',
    canActivate: [LogInGuard],
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}